import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { ItemRequest } from '../models/itemRequest.model';
import { Item } from '../models/item.model';
import { OrderRequest } from '../interfaces/order-request';
import { Simple } from '../models/simple.model';
import { ChromeExtensionsService } from './chrome-extensions.service';
import { serverAddress } from '../../assets/utils/environment';
import { FilterService } from './filter.service';
import * as _ from 'lodash';
import { itemDetails } from '../mock/itemDetailsMock';
import { ModelParser } from './model-parser';
import { ZalandoLoungeApiService } from './zalando-lounge-api.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {

  private failedItemList: OrderRequest[];
  private boughtItemsAmount: number;

  constructor(private http: HttpClient,
              private apiServiceService: ZalandoLoungeApiService,
              private filterService: FilterService,
              private chromeExtensionsService: ChromeExtensionsService) {

  }

  buy(itemRequest: ItemRequest, simple: Simple): Promise<any> {
    return this.http.post(this.apiServiceService.getOrderAddress(), ModelParser.parseItemToOrderRequest(new Item({ article: itemRequest, simple }))).toPromise();
  }

  fetchCampingItems(useFilters: boolean): Promise<ItemRequest[]> {
    const campaignIds: string[] = localStorage.getItem('campaignId').split(',').map(el => el.trim());
    const filters = localStorage.getItem('itemFilters');
    return Promise.all(campaignIds.map(el => this.http.get<ItemRequest[]>(this.apiServiceService.getEventAddress() + el + (useFilters ? filters : '/articles?size=1000&'))
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
      .then(() => this.http.post(this.apiServiceService.getOrderAddress(), ModelParser.parseItemToOrderRequest(item)).toPromise()
        .then(() => this.boughtItemsAmount++)
        .catch(err => {
          this.failedItemList.push(ModelParser.parseItemToOrderRequest(item));
          this.chromeExtensionsService.log(`Cannot buy =`, ModelParser.parseItemToOrderRequest(item));
          this.chromeExtensionsService.log(`${err.error.message} | Url = https://www.zalando-lounge.pl${item.urlPath}`);
        }));
  }

  getArticleDetails(eventId: string, articleId: string): Promise<ItemRequest> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<ItemRequest>(this.apiServiceService.getArticleDetailsAddress(eventId, articleId), {
      headers,
    }).toPromise();
    // return Promise.resolve(itemDetails);
  }

}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
