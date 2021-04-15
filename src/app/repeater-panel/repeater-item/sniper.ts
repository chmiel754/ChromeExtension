import { SniperStatus } from '../../enum/sniper-status.enum';
import { interval } from 'rxjs';
import { Injector } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { StockStatus } from '../../enum/stock-status.enum';
import { Simple } from '../../models/simple.model';
import { ItemRequest } from '../../models/itemRequest.model';

export class Sniper {
  public interval;
  public status: SniperStatus = SniperStatus.STOPPED;
  private shoppingService: ShoppingService;

  public item: ItemRequest = new ItemRequest();

  constructor(private data: {
                eventId: () => string,
                articleId: () => string,
                wantedItemList: Map<string, string>,
                interval?: number
              },
              private injector: Injector) {
    this.interval = data.interval || 1000;
    this.shoppingService = this.injector.get(ShoppingService);
    this.initItem();
    this.action();
  }

  start() {
    this.status = SniperStatus.WORKING;
  }

  stop() {
    this.status = SniperStatus.STOPPED;
  }

  action() {
    interval(this.interval).subscribe(() => {
      if (this.status === SniperStatus.WORKING && this.data.wantedItemList.size !== 0) {
        this.shoppingService.getArticleDetails(this.data.eventId(), this.data.articleId())
          .then(art => {
            this.item = art;
            return art;
          })
          .then(articleDetails => articleDetails.simples.filter(el => this.data.wantedItemList.has(el.filterValue)))
          .then(wantedItemList => this.filterAvailableItemList(wantedItemList))
          .then(availableSimplesList => this.buyAvailableItems(availableSimplesList));
      }
    });
  }

  private buyAvailableItems(availableSimplesList: Simple[]) {
    availableSimplesList.forEach(simple => {
      this.shoppingService.buy(this.item, simple)
        .then(() => this.data.wantedItemList.delete(simple.filterValue))
        .then(() => this.setStatusStoppedWhenNoItems())
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
          this.data.wantedItemList.delete(simple.filterValue);
          this.setStatusStoppedWhenNoItems();
          break;
        case StockStatus.RESERVED:
      }
    });
    return list;
  }

  private setStatusStoppedWhenNoItems(): void {
    if (this.data.wantedItemList.size === 0) {
      this.stop();
    }
  }

  private initItem() {
    this.shoppingService.getArticleDetails(this.data.eventId(), this.data.articleId())
      .then(res => this.item = res);
  }

}
