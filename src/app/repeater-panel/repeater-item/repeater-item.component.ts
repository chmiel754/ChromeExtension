import {
  Component,
  Inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { ItemRequest } from '../../models/itemRequest.model';
import { StockStatus } from '../../enum/stock-status.enum';
import { Simple } from '../../models/simple.model';
import { Sniper } from './sniper';

@Component({
  selector: 'app-repeater-item',
  templateUrl: './repeater-item.component.html',
  styles: [],
})
export class RepeaterItemComponent implements OnInit {

  private wantedItemList: Map<string, string> = new Map();

  @Input()
  eventId: string = 'ZZO1B6L';

  @Input()
  articleId: string = 'JOC12N017-Q13';

  item: ItemRequest = new ItemRequest();

  sniper: Sniper = new Sniper({
    eventId: this.eventId,
    articleId: this.articleId,
    item: this.item,
    wantedItemList: this.wantedItemList,
  }, this.injector);

  constructor(private shoppingService: ShoppingService,
              private injector: Injector) {
  }

  ngOnInit(): void {
    this.shoppingService.getArticleDetails(this.eventId, this.articleId)
      .then(res => this.item = res);
  }

  insertIntoWantedList(simple: Simple): void {
    if (this.wantedItemList.has(simple.filterValue)) {
      this.wantedItemList.delete(simple.filterValue);
    } else {
      this.wantedItemList.set(simple.filterValue, simple.sku);
    }
  }

  getItemPhoto(item: ItemRequest): string {
    return `https://mosaic03.ztat.net/vgs/media/zlcatalog/${item.media[0].path}`;
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
