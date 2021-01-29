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

@Component({
  selector: 'app-shopping-panel',
  templateUrl: './shopping-panel.component.html',
  providers: [MessageService],
})
export class ShoppingPanelComponent implements OnInit {

  mainForm: FormGroup;

  campaignId: string;
  itemsAmount: string;

  constructor(private shoppingService: ShoppingService,
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

  private showMessages(response): void {
    if (response.bought !== 0) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Bought ${response.bought} items` });
    }
    if (response.failed.length !== 0) {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: `Couldn't buy ${response.failed.length} items` });
    }
  }

}
