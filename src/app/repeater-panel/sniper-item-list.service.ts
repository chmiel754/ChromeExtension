import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
} from 'rxjs';
import { ItemRequest } from '../models/itemRequest.model';

@Injectable({
  providedIn: 'root',
})
export class SniperItemListService {

  private list: ItemRequest[] = [];

  sniperItemList: Subject<ItemRequest[]> = new Subject<ItemRequest[]>();

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
      this.list.splice(index,  1);
      this.sniperItemList.next(this.list);
    }
  }

}
