import {
  Component,
  OnInit,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ItemsController } from './items-controller';
import { UrlServiceService } from '../services/url-service.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  providers: [MessageService],
})
export class SettingsPanelComponent implements OnInit {

  manSettings: FormGroup;
  itemsController = new ItemsController();
  storedFormValues = {};

  constructor(private urlServiceService: UrlServiceService) {
    this.storedFormValues = JSON.parse(localStorage.getItem('manSettings'));
  }

  ngOnInit(): void {
    this.initForm();
    this.initStoredValue();
  }

  initStoredValue() {
    this.manSettings.patchValue(this.storedFormValues);
  }

  initForm() {
    this.manSettings = new FormGroup({
      marks: new FormGroup({
        top: new FormControl(null),
        other: new FormControl(null),
      }),
      categories: new FormGroup({
        clothes: new FormControl(null),
        shoes: new FormControl(null),
        accessories: new FormControl(null),
      }),
      sizes: new FormGroup({
        shoes: new FormControl(null),
        tops: new FormControl(null),
        pants: new FormControl(null),
        underwear: new FormControl(null),
      }),
      prices: new FormGroup({
        shoes: new FormControl(null),
        tops: new FormControl(null),
        pants: new FormControl(null),
        underwear: new FormControl(null),
        accessories: new FormControl(null),
        others: new FormControl(null),
      }),
      discount: new FormControl(null),
      requestDelay: new FormControl(null),
    });
  }

  onSubmit() {
    localStorage.setItem('manSettings', JSON.stringify(this.manSettings.value));
    localStorage.setItem('pricesRange', JSON.stringify(this.manSettings.value.prices));
    localStorage.setItem('requestDelay', JSON.stringify(this.manSettings.value.requestDelay));
    this.urlServiceService.saveItemFilters(this.manSettings.value);
  }

  getCategoryValue(category: string, field: string): number[] {
    return this.manSettings.value[category][field] || [0, 0];
  }

}

