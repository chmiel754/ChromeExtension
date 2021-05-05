import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { ItemRequest } from '../../models/itemRequest.model';
import { StockStatus } from '../../enum/stock-status.enum';
import { Simple } from '../../models/simple.model';
import { SniperItemListService } from '../sniper-item-list.service';
import { Sniper } from '../../sniper/sniper';

@Component({
  selector: 'app-repeater-item',
  templateUrl: './repeater-item.component.html',
  styles: [],
})
export class RepeaterItemComponent implements OnInit {

  public wantedItemList: Simple[] = [];

  @Input()
  eventId: string;

  @Input()
  articleId: string;

  sniper: Sniper;

  public delay: number = 1000;

  public item: ItemRequest = new ItemRequest();

  constructor(private shoppingService: ShoppingService,
              public sniperItemListService: SniperItemListService) {
  }

  ngOnInit(): void {
    this.initItem();
    this.sniper = new Sniper(this.delay, this.action.bind(this));
  }

  handleWatchedList(simple: Simple) {
    this.wantedItemList.find(el => el.sku === simple.sku) ? this.removeItem(simple) : this.wantedItemList.push(simple);
  }

  getItemPhoto(item: ItemRequest): string {
    return item.media ? `https://mosaic03.ztat.net/vgs/media/zlcatalog/${item.media[0].path}` : '';
  }

  getSimpleClass(simple: Simple): string {
    if (this.wantedItemList.find(el => el.sku === simple.sku)) {
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

  action() {
    this.shoppingService.getArticleDetails(this.eventId, this.articleId)
      .then(art => this.item = art)
      .then(articleDetails => articleDetails.simples.filter(el => this.wantedItemList.find(wantedItem => el.filterValue === wantedItem.filterValue)))
      .then(wantedItemList => this.filterAvailableItemList(wantedItemList))
      .then(availableSimplesList => this.buyAvailableItems(availableSimplesList))
      .then(() => !this.wantedItemList.length ? this.sniper.stop() : null);
  }

  private buyAvailableItems(availableSimplesList: Simple[]) {
    availableSimplesList.forEach(simple => {
      this.shoppingService.buy(this.item, simple)
        .then(() => this.removeItem(simple))
        .catch(err => console.log(err, 'err'));
    });
  }

  private filterAvailableItemList(simples: Simple[]): Simple[] {
    const list: Simple[] = [];
    simples.forEach(simple => {
      switch (simple.stockStatus) {
        case StockStatus.AVAILABLE:
          list.push(simple);
          break;
        case StockStatus.SOLD_OUT:
          this.removeItem(simple);
          break;
        case StockStatus.RESERVED:
      }
    });
    return list;
  }

  private initItem() {
    this.shoppingService.getArticleDetails(this.eventId, this.articleId)
      .then(res => this.item = res);
  }

  private removeItem(simples: Simple) {
    const wantedEl = this.wantedItemList.find(el => el.sku === simples.sku);
    const index = this.wantedItemList.indexOf(wantedEl);
    if (index !== -1) {
      this.wantedItemList.splice(index, 1);
    }
  }

}
