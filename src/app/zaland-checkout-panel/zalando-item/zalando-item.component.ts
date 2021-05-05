import {
  Component,
  OnInit,
} from '@angular/core';
import { ZalandoApiService } from '../../services/zalando-api.service';
import { ZalandoScraperService } from '../../scrapers/zalando-scraper.service';
import { ZalandoItemSimple } from '../../interfaces/zalando-item-simple';
import { ZalandoStockStatus } from '../../enum/zalando-stock-status.enum';
import { Sniper } from '../../sniper/sniper';
import { ChromeExtensionsService } from '../../services/chrome-extensions.service';

@Component({
  selector: 'app-zalando-item',
  templateUrl: './zalando-item.component.html',
})
export class ZalandoItemComponent implements OnInit {

  itemKey: string;
  simplesList2: ZalandoItemSimple[] = [];
  watchedSimplesList: ZalandoItemSimple[] = [];

  sniper: Sniper;

  constructor(public zalandoApiService: ZalandoApiService,
              public chromeExtensionsService: ChromeExtensionsService,
              private zalandoScraperService: ZalandoScraperService) {
  }

  ngOnInit(): void {
    this.sniper = new Sniper(2000, this.action.bind(this));
  }

  initItemData() {
    this.watchedSimplesList = [];
    this.fetchItemDataByKey(this.itemKey)
      .then(res => this.simplesList2 = this.zalandoScraperService.getALlSimplesList(res));
  }

  fetchItemDataByKey(key: string): Promise<string> {
    return this.zalandoScraperService.getItemPageData(key);
  }

  getSimpleClass(simple: any): string {
    return this.watchedSimplesList.includes(simple) ? 'p-button-secondary' : '';
  }

  handleWatchedList(simple: ZalandoItemSimple) {
    if (this.watchedSimplesList.includes(simple)) {
      const itemIndex = this.watchedSimplesList.indexOf(simple);
      this.watchedSimplesList.splice(itemIndex, 1);
    } else {
      this.watchedSimplesList.push(simple);
    }
  }

  private action() {
    if (this.watchedSimplesList.length !== 0) {
      this.zalandoScraperService.getItemPageData(this.itemKey)
        .then(res => this.zalandoScraperService.getALlSimplesList(res))
        .then(allSimplesList => this.checkAvailableSimples(allSimplesList))
        .then(availableList => this.zalandoScraperService.getIntoOrderList(availableList))
        .catch(err => null);
    } else {
      if (this.watchedSimplesList.length === 0) {
        this.sniper.stop();
      }
    }
  }

  private checkAvailableSimples(simples: ZalandoItemSimple[]): ZalandoItemSimple[] {
    const availableList: ZalandoItemSimple[] = [];
    simples.forEach((simple) => {
      if (simple.offer.stock.quantity !== ZalandoStockStatus.OUT_OF_STOCK && this.watchedSimplesList.find(el => el.size === simple.size)) {
        availableList.push(simple);
        this.removeItemFromWatchedList(simple);
      }
    });
    return availableList;
  }

  removeItemFromWatchedList(el: ZalandoItemSimple) {
    const itemIndex = this.watchedSimplesList.indexOf(el);
    this.watchedSimplesList.splice(itemIndex, 1);
  }

}
