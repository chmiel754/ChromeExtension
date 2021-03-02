import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ShoppingService } from '../services/shopping.service';
import { MessageService } from 'primeng/api';
import { ChromeExtensionsService } from '../services/chrome-extensions.service';
import { MainPageService } from '../services/main-page.service';
import { ShoppingEvent } from '../models/shoppingEvent.model';
import { brands } from '../const/brands';
import * as _ from 'lodash';

@Component({
  selector: 'app-shopping-panel',
  templateUrl: './shopping-panel.component.html',
  providers: [MessageService],
})
export class ShoppingPanelComponent implements OnInit {

  datePipe = new Date();

  mainForm: FormGroup;

  brands = brands;

  openCampaignsCollapse: true;

  campaignId: string;
  itemsAmount: string;

  openCampaigns: ShoppingEvent[] = [];
  upcomingCampaigns: ShoppingEvent[] = [];

  constructor(
    public chromeExtensionsService: ChromeExtensionsService,
    private mainPageService: MainPageService,
    private shoppingService: ShoppingService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.campaignId = localStorage.getItem('campaignId');
    this.itemsAmount = localStorage.getItem('itemsAmount');
  }

  initForm() {
    this.mainForm = new FormGroup({
      main: new FormGroup({
        campaignId: new FormControl(null),
        itemAmountToBuy: new FormControl(null),
      }),
    });

  }

  save() {
    localStorage.setItem('campaignId', this.campaignId);
    this.itemsAmount ? localStorage.setItem('itemsAmount', this.itemsAmount) : localStorage.setItem('itemsAmount', '');
  }

  buyItems() {
    this.shoppingService.handleItemsAndBuy()
      .then(res => this.showMessages(res));
  }

  initEvents() {
    this.mainPageService.getEventsList()
      .then(list => {
        this.openCampaigns = (list as any).openCampaigns;
        this.upcomingCampaigns = (list as any).upcomingCampaigns;
      });
  }

  getCampaignImg(event: ShoppingEvent): string {
    return event.images.upcoming;
  }

  getDecodedBrands(event: ShoppingEvent): string {
    if (event.brands?.length) {
      return event.brands.map(el => this.brands[el]).toLocaleString();
    } else {
      return '';
    }

  }

  addCampaignId(id: string) {
    const campaignIdList = !_.isEmpty(this.campaignId) ?
      this.campaignId.replace(/\s/g, '').split(',') : [];
    const elementId = campaignIdList.indexOf(id);

    if (elementId === -1) {
      campaignIdList.push(id);
    } else {
      campaignIdList.splice(elementId, 1);
    }
    this.campaignId = campaignIdList.toString();
  }

  getClass(event) {
    return this.campaignId.includes(event.campaignId) ? 'p-button-warning' : 'p-button-success';
  }

  timeLeft(date: string) {
    const timeLeft = new Date(new Date().getUTCHours() - new Date(date).getUTCHours());
    return `${timeLeft.getHours()}:${timeLeft.getMinutes()}:${timeLeft.getSeconds()}`;
  }

  private showMessages(response): void {
    if (response.bought !== 0) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Bought ${response.bought} items` });
    }
    if (response.failed.length !== 0) {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: `Couldn't buy ${response.failed.length} items` });
    }
  }

}
