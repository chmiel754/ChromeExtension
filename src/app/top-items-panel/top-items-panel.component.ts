import {
  Component,
  ViewChild,
} from '@angular/core';
import { ShoppingService } from '../services/shopping.service';
import { ItemRequest } from '../models/itemRequest.model';
import { MessageService } from 'primeng/api';
import { Simple } from '../models/simple.model';
import { StockStatus } from '../enum/stock-status.enum';
import { OrderList } from 'primeng/orderlist';
import { ChromeExtensionsService } from '../services/chrome-extensions.service';
import { ZalandoService } from '../services/zalando.service';

@Component({
  selector: 'app-top-items-panel',
  templateUrl: './top-items-panel.component.html',
  providers: [MessageService],
})
export class TopItemsPanelComponent {

  @ViewChild('orderList')
  orderList: OrderList;

  stockStatus = StockStatus;

  topItemList: ItemRequest[] = [];

  constructor(private shoppingService: ShoppingService,
              public zalandoService: ZalandoService,
              private clipboard: Clipboard,
              public chromeExtensionsService: ChromeExtensionsService,
              private messageService: MessageService) {
  }

  initItemList(useFilters: boolean): void {
    this.topItemList = [];
    this.shoppingService.getTopItems(useFilters)
      .then((list) => this.topItemList.push(...list))
      .then(() => this.sortByPrice());
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
      .catch(err => this.messageService.add({ severity: 'error', summary: 'Failed', detail: `Failed - ${err.error.message}` }));
  }

  sortByDiscount() {
    this.topItemList.sort((a, b) => a.savings > b.savings ? -1 : 1);
    this.orderList.cd.detectChanges();
  }

  sortByPrice() {
    this.topItemList.sort((a, b) => a.specialPrice < b.specialPrice ? -1 : 1);
    this.orderList.cd.detectChanges();
  }

  goToItem(item: ItemRequest) {
    this.chromeExtensionsService.log(`Url = https://www.zalando-lounge.pl${item.urlPath['45']}`);
  }

  copy(){
  }

}
