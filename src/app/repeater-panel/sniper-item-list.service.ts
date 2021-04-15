import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { ItemRequest } from '../models/itemRequest.model';

@Injectable({
  providedIn: 'root',
})
export class SniperItemListService {

  private list: ItemRequest[] = [];

  sniperItemList: BehaviorSubject<ItemRequest[]> = new BehaviorSubject<ItemRequest[]>(this.list);

  addItem(item: ItemRequest) {
    if (!this.list.includes(item)) {
      this.list.push(item);
      this.sniperItemList.next(this.list);
    }
  }

  getItemList(): Observable<ItemRequest[]> {
    return this.sniperItemList.asObservable();
  }

  deleteItem(item: ItemRequest) {
    const index = this.list.findIndex(el => el.sku === item.sku);
    if (index !== -1) {
      console.log('index', index);
      this.list.slice(index, 1);
      this.sniperItemList.next(this.list);
    }
  }

}
