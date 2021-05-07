import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
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
import { SniperItemListService } from '../repeater-panel/sniper-item-list.service';
import { ModelParser } from '../services/model-parser';
import { ZalandoLoungeApiService } from '../services/zalando-lounge-api.service';
import * as _ from 'lodash';
import { ZalandoItemList } from './item-list/zalando-item-list';
import { ZalandoItemCategoriesMap } from './item-list/zalando-item-categories-map';

@Component({
  selector: 'app-top-items-panel',
  templateUrl: './top-items-panel.component.html',
  providers: [MessageService],
})
export class TopItemsPanelComponent implements OnInit {

  @ViewChild('orderList')
  orderList: OrderList;

  categoriesList: string[] = [];

  stockStatus = StockStatus;

  topItemList: ItemRequest[] = [];

  itemList: ZalandoItemList = new ZalandoItemList();

  itemCategoriesMap: ZalandoItemCategoriesMap = new ZalandoItemCategoriesMap();

  constructor(private shoppingService: ShoppingService,
              private alertService: AlertService,
              private messageService: MessageService,
              public apiServiceService: ZalandoLoungeApiService,
              public sniperItemListService: SniperItemListService,
              public chromeExtensionsService: ChromeExtensionsService) {

    this.itemList.setItemList(JSON.parse(localStorage.getItem('topItemList')));
  }

  ngOnInit() {
  }

  initItemList(useFilters: boolean): void {
    this.topItemList = [];
    this.alertService.clearValues();
    this.shoppingService.getTopItems(useFilters)
      .then((list) => {
        this.itemList.setItemList(list);
        this.itemCategoriesMap.check(list);
        console.log(this.itemCategoriesMap.getCategories());
      })
      .then(() => localStorage.setItem('topItemList', JSON.stringify(this.itemList.getItemList())))
      .then(() => this.itemList.sortByPrice());
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
        this.chromeExtensionsService.copyText(JSON.stringify(ModelParser.parseItemToOrderRequest(new Item({ article: item, simple }))));
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: `Failed - ${err.error.message}` });
      });
  }

  goToItem(item: ItemRequest) {
    this.chromeExtensionsService.copyText(this.apiServiceService.getItemDetailsAddress(item));
    this.chromeExtensionsService.log(`Url = ${this.apiServiceService.getItemDetailsAddress(item)}`);
  }

  setJordanButtonClass(alert: boolean): string {
    if (alert) {
      return 'p-button-warning';
    } else {
      return '';
    }
  }
}
