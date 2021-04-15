import {
  Component,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { ItemRequest } from '../../models/itemRequest.model';
import { StockStatus } from '../../enum/stock-status.enum';
import { Simple } from '../../models/simple.model';
import { Sniper } from './sniper';
import { SniperItemListService } from '../sniper-item-list.service';

@Component({
  selector: 'app-repeater-item',
  templateUrl: './repeater-item.component.html',
  styles: [],
})
export class RepeaterItemComponent implements OnInit {

  public wantedItemList: Map<string, string> = new Map();

  @Input()
  eventId: string;

  @Input()
  articleId: string;

  sniper: Sniper;

  constructor(private shoppingService: ShoppingService,
              private injector: Injector,
              public sniperItemListService: SniperItemListService) {
  }

  ngOnInit(): void {
    this.sniper = new Sniper({
      eventId: () => this.eventId,
      articleId: () => this.articleId,
      wantedItemList: this.wantedItemList,
    }, this.injector);
  }

  insertIntoWantedList(simple: Simple): void {
    if (this.wantedItemList.has(simple.filterValue)) {
      this.wantedItemList.delete(simple.filterValue);
    } else {
      this.wantedItemList.set(simple.filterValue, simple.sku);
    }
  }

  getItemPhoto(item: ItemRequest): string {
    return item.media ? `https://mosaic03.ztat.net/vgs/media/zlcatalog/${item.media[0].path}` : '';
  }

  getSimpleClass(simple: Simple): string {
    if (this.wantedItemList.has(simple.filterValue)) {
      return 'p-button-secondary';
    }
    switch (simple.stockStatus) {
      case StockStatus.AVAILABLE:
        return '';
      case StockStatus.RESERVED:
        return 'p-button-warning';
      case StockStatus.SOLD_OUT:
        return 'p-button-danger';
    }
  }

}
