import { SniperStatus } from '../../enum/sniper-status.enum';
import {
  interval,
  Subscription,
} from 'rxjs';
import { Injector } from '@angular/core';
import { ZalandoScraperService } from '../../scrapers/zalando-scraper.service';
import { ZalandoItemSimple } from '../../interfaces/zalando-item-simple';
import { ZalandoStockStatus } from '../../enum/zalando-stock-status.enum';
import { ChromeExtensionsService } from '../../services/chrome-extensions.service';
import { ZalandoApiService } from '../../services/zalando-api.service';

export class ZalandoItemSniper {
  public status: SniperStatus = SniperStatus.STOPPED;
  private interval;

  private zalandoScraperService: ZalandoScraperService;
  private zalandoApiService: ZalandoApiService;
  public chromeExtensionsService: ChromeExtensionsService;

  private subscription: Subscription;

  constructor(private data: {
                itemKey: () => string,
                watchedSimplesList: Map<string, ZalandoItemSimple>,
                interval?: number
              },
              private injector: Injector) {
    this.interval = data.interval || 2000;
    this.zalandoScraperService = this.injector.get(ZalandoScraperService);
    this.chromeExtensionsService = this.injector.get(ChromeExtensionsService);
  }

  start() {
    if (this.data.watchedSimplesList.size !== 0) {
      this.status = SniperStatus.WORKING;
      this.subscription = interval(this.interval).subscribe(() => this.action());
    }
  }

  stop() {
    this.status = SniperStatus.STOPPED;
    this.subscription.unsubscribe();
  }

  action() {
    if (this.status === SniperStatus.WORKING && this.data.watchedSimplesList.size !== 0) {
      this.zalandoScraperService.getItemPageData(this.data.itemKey())
        .then(res => this.zalandoScraperService.getAllSimplesMap(res))
        .then(allSimplesList => this.checkAvailableSimples(allSimplesList))
        .then(availableList => this.zalandoScraperService.getIntoOrderList(availableList));
    } else {
      if (this.data.watchedSimplesList.size === 0) {
        this.status = SniperStatus.STOPPED;
      }
    }
  }

  checkAvailableSimples(simples: Map<string, ZalandoItemSimple>): ZalandoItemSimple[] {
    const availableList: ZalandoItemSimple[] = [];
    simples.forEach((v, k) => {
      if (v.offer.stock.quantity !== ZalandoStockStatus.OUT_OF_STOCK && this.data.watchedSimplesList.has(k)) {
        availableList.push(v);
        this.data.watchedSimplesList.delete(k);
      }
    });
    return availableList;
  }

}
