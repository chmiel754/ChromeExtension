import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ModelParser,
  ShoppingService,
} from '../services/shopping.service';
import { ItemRequest } from '../models/itemRequest.model';
import { MessageService } from 'primeng/api';
import { Simple } from '../models/simple.model';
import { StockStatus } from '../enum/stock-status.enum';
import { OrderList } from 'primeng/orderlist';
import { ChromeExtensionsService } from '../services/chrome-extensions.service';
import { Item } from '../models/item.model';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-top-items-panel',
  templateUrl: './top-items-panel.component.html',
  providers: [MessageService],
})
export class TopItemsPanelComponent implements OnInit {

  @ViewChild('orderList')
  orderList: OrderList;

  stockStatus = StockStatus;

  topItemList: ItemRequest[] = [];

  constructor(private shoppingService: ShoppingService,
              private alertService: AlertService,
              public chromeExtensionsService: ChromeExtensionsService,
              private messageService: MessageService) {

    this.topItemList = JSON.parse(localStorage.getItem('topItemList')) || [];
  }

  ngOnInit() {
  }

  initItemList(useFilters: boolean): void {
    this.topItemList = [];
    this.alertService.clearValues();
    this.shoppingService.getTopItems(useFilters)
      .then((list) => this.topItemList.push(...list))
      .then(() => localStorage.setItem('topItemList', JSON.stringify(this.topItemList)))
      .then(() => this.sortByPrice())
      .then(() => console.log(this.alertService.allAlerts));
  }

  getItemPhoto(item: ItemRequest): string {
    return `https://mosaic03.ztat.net/vgs/media/zlcatalog/${item.media[0].path}`;
  }

  getSimpleClass(status: StockStatus): string {
    switch (status) {
      case StockStatus.AVAILABLE:
        return '';
      case StockStatus.RESERVED:
        return 'p-button-warning';
      case StockStatus.SOLD_OUT:
        return 'p-button-danger';
    }
  }

  butItem(item: ItemRequest, simple: Simple) {
    this.shoppingService.buy(item, simple)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Successfully bought` });
      })
      .catch(err => {
        this.copyText(JSON.stringify(ModelParser.parseItemToOrderRequest(new Item({ article: item, simple }))));
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: `Failed - ${err.error.message}` });
      });
  }

  sortByDiscount() {
    this.topItemList.sort((a, b) => a.savings > b.savings ? -1 : 1);
    this.orderList.cd.detectChanges();
  }

  sortByPrice() {
    this.topItemList.sort((a, b) => a.specialPrice < b.specialPrice ? -1 : 1);
    this.orderList.cd.detectChanges();
  }

  sortJordanFirst() {
    this.topItemList.sort((a, b) => a.brand === 'Jordan' ? -1 : 1);
    this.orderList.cd.detectChanges();
  }

  goToItem(item: ItemRequest) {
    this.copyText(`https://www.zalando-lounge.pl${item.urlPath['45']}`);
    this.chromeExtensionsService.log(`Url = https://www.zalando-lounge.pl${item.urlPath['45']}`);
  }

  setJordanButtonClass(alert: boolean): string {
    if (alert) {
      console.log('alert');
      return 'p-button-warning';
    } else {
      return '';
    }
  }

  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
