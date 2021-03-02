import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemRequest } from '../models/itemRequest.model';
import { Item } from '../models/item.model';
import { ItemSetting } from '../interfaces/item-setting';
import { OrderRequest } from '../interfaces/order-request';
import { Simple } from '../models/simple.model';
import { ChromeExtensionsService } from './chrome-extensions.service';
import { serverAddress } from '../../assets/utils/environment';
import { sneakersyMock } from '../mock/sneakersy';
import { AlertService } from './alert.service';
import { FilterService } from './filter.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {

  private readonly eventAddress: string = `${serverAddress}/api/phoenix/catalog/events/`;
  private readonly orderAddress: string = `${serverAddress}/api/phoenix/stockcart/cart/items`;

  private failedItemList: OrderRequest[];
  private boughtItemsAmount: number;

  constructor(private http: HttpClient,
              private filterService: FilterService,
              private chromeExtensionsService: ChromeExtensionsService) {

  }

  buy(itemRequest: ItemRequest, simple: Simple): Promise<any> {
    return this.http.post(this.orderAddress, ModelParser.parseItemToOrderRequest(new Item({ article: itemRequest, simple }))).toPromise();
  }

  fetchCampingItems(useFilters: boolean): Promise<ItemRequest[]> {
    const campaignIds: string[] = localStorage.getItem('campaignId').split(',').map(el => el.trim());
    const filters = localStorage.getItem('itemFilters');
    return Promise.all(campaignIds.map(el => this.http.get<ItemRequest[]>(this.eventAddress + el + (useFilters ? filters : '/articles?size=1000&'))
      .toPromise()))
      .then((i) => _.flatten(i));
    // return Promise.resolve(sneakersyMock);
  }

  getTopItems(useFilters: boolean): Promise<ItemRequest[]> {
    return this.fetchCampingItems(useFilters)
      .then(itemList => this.filterService.filterTopItems(itemList));
  }

  handleItemsAndBuy(): Promise<any> {
    this.failedItemList = [];
    this.boughtItemsAmount = 0;
    return this.handleItems()
      .then(itemList => Promise.all(this.callItemOrder(itemList)))
      .then((t) => ({ failed: this.failedItemList, bought: this.boughtItemsAmount }));
  }

  handleItems(): Promise<Item[]> {
    return this.fetchCampingItems(true)
      .then(articlesList => ModelParser.parseToItemList(articlesList))
      .then(itemList => this.filterService.filterResultsByUserRequirements(itemList));
  }

  callItemOrder(itemList: Item[]): Promise<any>[] {
    const itemsAmount = localStorage.getItem('itemsAmount');
    const requestDelay: number = Number(localStorage.getItem('requestDelay') || 0);
    if (itemsAmount) {
      return itemList.map((el, i) => i < Number(itemsAmount) ? this.orderRequest(el, i * requestDelay) : null);
    } else {
      return itemList.map((el, i) => this.orderRequest(el, i * requestDelay));
    }
  }

  orderRequest(item: Item, delay: number = 0): Promise<any> {
    return sleep(delay)
      .then(() => this.http.post(this.orderAddress, ModelParser.parseItemToOrderRequest(item)).toPromise()
        .then(() => this.boughtItemsAmount++)
        .catch(err => {
          this.failedItemList.push(ModelParser.parseItemToOrderRequest(item));
          this.chromeExtensionsService.log(`Cannot buy =`, ModelParser.parseItemToOrderRequest(item));
          this.chromeExtensionsService.log(`${err.error.message} | Url = https://www.zalando-lounge.pl${item.urlPath}`);
        }));
  }

}

export class ModelParser {
  static parseToItemList(articlesList: ItemRequest[]): Item[] {
    const loggerService: ChromeExtensionsService = new ChromeExtensionsService();
    loggerService.log(`Items ${articlesList.length}`);
    const results: Item[] = [];
    articlesList.forEach((el: ItemRequest) => el?.simples.forEach(i => results.push(new Item({ article: el, simple: i }))));
    return results;
  }

  static parseItemToOrderRequest(item: Item): OrderRequest {
    return {
      quantity: 1,
      campaignIdentifier: item.campaignIdentifier,
      configSku: item.configSku,
      simpleSku: item.sku,
      additional: { reco: 0 },
      ignoreExceptionCodes: [
        506,
      ],
    };
  }

  static itemRequestToSimpleItem(itemRequest: ItemRequest): Item {
    return new Item({
      article: itemRequest,
      simple: new Simple({ specialPrice: itemRequest.specialPrice, filterName: itemRequest.simples[0].filterName }),
    });
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
