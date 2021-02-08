import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemRequest } from '../models/itemRequest.model';
import { Item } from '../models/item.model';
import { ItemSetting } from '../interfaces/item-setting';
import { OrderRequest } from '../interfaces/order-request';
import { Simple } from '../models/simple.model';
import { ChromeExtensionsService } from './chrome-extensions.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {

  private readonly serverAddress: string = 'https://www.zalando-lounge.pl/api/phoenix/catalog/events/';
  private readonly orderAddress: string = 'https://www.zalando-lounge.pl/api/phoenix/stockcart/cart/items';

  private failedItemList: OrderRequest[];
  private boughtItemsAmount: number;

  constructor(private http: HttpClient,
              private chromeExtensionsService: ChromeExtensionsService) {

  }

  buy(itemRequest: ItemRequest, simple: Simple): Promise<any> {
    return this.http.post(this.orderAddress, ModelParser.parseItemToOrderRequest(new Item({ article: itemRequest, simple }))).toPromise();
  }

  fetchCampingItems(useFilters: boolean): Promise<ItemRequest[]> {
    const campaignIds: string[] = localStorage.getItem('campaignId').split(',').map(el => el.trim());
    const filters = localStorage.getItem('itemFilters');
    return Promise.all(campaignIds.map(el => this.http.get<ItemRequest[]>(this.serverAddress + el + (useFilters ? filters : '/articles?size=1000&'))
      .toPromise()))
      .then((i) => _.flatten(i));
    // return Promise.resolve(guessAccMock);
  }

  getTopItems(useFilters: boolean): Promise<ItemRequest[]> {
    return this.fetchCampingItems(useFilters)
      .then(itemList => FilterController.filterTopItems(itemList));
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
      .then(itemList => FilterController.filterResultsByUserRequirements(itemList));
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

class FilterController {
  static filterResultsByUserRequirements(itemList: Item[]): Item[] {
    const filterController = new FilterController();
    const itemSettings = JSON.parse(localStorage.getItem('manSettings'));
    return itemList.filter(item =>
      filterController.isSelectedSize(item, itemSettings)
      && filterController.isInPriceRange(item, itemSettings)
      && filterController.isSelectedTopMark(item, itemSettings)
      && filterController.isDiscountEnough(item, itemSettings),
    );
  }

  static filterTopItems(itemRequest: ItemRequest[]): ItemRequest[] {
    const filterController = new FilterController();
    const itemSettings = JSON.parse(localStorage.getItem('manSettings'));
    return itemRequest.filter(item => {
        const parsedItem = ModelParser.itemRequestToSimpleItem(item);
        return filterController.isSelectedTopMark(parsedItem, itemSettings)
          && filterController.isInPriceRange(parsedItem, itemSettings);
      },
    );
  }

  private isInPriceRange(item: Item, itemSettings: ItemSetting): boolean {
    const priceRange: number[] = itemSettings.prices[item.filterName] || [0, 0];
    return item.specialPrice / 100 >= priceRange[0] && item.specialPrice / 100 <= priceRange[1];
  }

  private isSelectedTopMark(item: Item, itemSettings: ItemSetting): boolean {
    const topMarkList: string[] = itemSettings.marks.top || [];
    if (itemSettings.marks.other?.length >= 3) {
      return !!topMarkList.find(el => item.brand.includes(el.toLowerCase())) || item.brand.includes(itemSettings.marks.other.toLowerCase());
    } else {
      return !!topMarkList.find(el => item.brand.includes(el.toLowerCase()));
    }
  }

  private isSelectedSize(item: Item, itemSettings: ItemSetting): boolean {
    const sizesList: string[] = itemSettings.sizes[item.filterName] || [];
    return sizesList.length ? !!sizesList.find(el => item.filterValue === el || item.filterValue === 'onesize') : false;
  }

  private isDiscountEnough(item: Item, itemSettings: ItemSetting): boolean {
    return itemSettings.discount ? item.discount >= itemSettings.discount : true;
  }

}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
