import { SniperStatus } from '../../enum/sniper-status.enum';
import { interval } from 'rxjs';
import { Injector } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { StockStatus } from '../../enum/stock-status.enum';
import { Simple } from '../../models/simple.model';
import { ItemRequest } from '../../models/itemRequest.model';
import { ChromeExtensionsService } from '../../services/chrome-extensions.service';

export class Sniper {
  public interval;
  public status: SniperStatus = SniperStatus.STOPPED;
  private shoppingService: ShoppingService;
  private chromeExtensionsService: ChromeExtensionsService;

  constructor(private data: {
                eventId: string,
                articleId: string,
                item: ItemRequest,
                wantedItemList: Map<string, string>,
                interval?: number
              },
              private injector: Injector) {
    this.interval = data.interval || 1000;
    this.shoppingService = this.injector.get(ShoppingService);
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
      if (this.status === SniperStatus.WORKING) {
        this.shoppingService.getArticleDetails(this.data.eventId, this.data.articleId)
          .then(articleDetails => articleDetails.simples.filter(el => this.data.wantedItemList.has(el.filterValue)))
          .then(wantedItemList => this.filterAvailableItemList(wantedItemList))
          .then(availableSimplesList => this.buyAvailableItems(availableSimplesList));
      }
    });
  }

  private buyAvailableItems(availableSimplesList: Simple[]){
    availableSimplesList.forEach(simple => {
      this.shoppingService.buy(this.data.item, simple)
        .then(res => this.chromeExtensionsService.log(res));
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
          break;
        case StockStatus.RESERVED:
      }
    });
    return list;
  }

}
