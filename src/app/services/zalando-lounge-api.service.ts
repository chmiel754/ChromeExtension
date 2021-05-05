import { Injectable } from '@angular/core';
import { ItemRequest } from '../models/itemRequest.model';

@Injectable({
  providedIn: 'root',
})
export class ZalandoLoungeApiService {

  private readonly PL_URL_NUMBER = '45';
  private readonly DE_URL_NUMBER = '17';

  private serverAddress: (tenant: string) => string = (t) => `https://www.zalando-lounge.${t}`;

  getServerAddress(): string {
    return this.serverAddress(this.getTenant());
  }

  getOrderAddress(): string {
    return `${this.getServerAddress()}/api/phoenix/stockcart/cart/items/`;
  }

  getEventAddress(): string {
    return `${this.getServerAddress()}/api/phoenix/catalog/events/`;
  }

  getArticleDetailsAddress(eventId: string, articleId: string): string {
    return `${this.getServerAddress()}/api/phoenix/catalog/events/${eventId}/articles/${articleId}`;
  }

  getItemDetailsAddress(item: ItemRequest): string {
    return `${this.getServerAddress()}${item.urlPath[this.PL_URL_NUMBER] ? item.urlPath[this.PL_URL_NUMBER] : item.urlPath[this.DE_URL_NUMBER]}`;
  }

  getTenant(): string {
    return JSON.parse(localStorage.getItem('manSettings'))?.tenant || 'pl';
  }
}
