import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemRequest } from '../models/itemRequest.model';
import { ItemSetting } from '../interfaces/item-setting';
import { ModelParser } from './model-parser';

@Injectable({ providedIn: 'root' })
export class FilterService {

  constructor() {
  }

  filterResultsByUserRequirements(itemList: Item[]): Item[] {
    const itemSettings = JSON.parse(localStorage.getItem('manSettings'));
    return itemList.filter(item =>
      this.isSelectedSize(item, itemSettings)
      && this.isInPriceRange(item, itemSettings)
      && this.isSelectedTopMark(item, itemSettings)
      && this.isDiscountEnough(item, itemSettings),
    );
  }

  filterTopItems(itemRequest: ItemRequest[]): ItemRequest[] {
    const itemSettings = JSON.parse(localStorage.getItem('manSettings'));
    return itemRequest.filter(item => {
        const parsedItem = ModelParser.itemRequestToSimpleItem(item);
        return this.isSelectedTopMark(parsedItem, itemSettings)
          && this.checkModel(parsedItem, itemSettings)
          && this.isInPriceRange(parsedItem, itemSettings);
      },
    );
  }

  private isInPriceRange(item: Item, itemSettings: ItemSetting): boolean {
    const priceRange: number[] = itemSettings.prices[item.filterName] || [0, 0];
    return item.specialPrice / 100 >= priceRange[0] && item.specialPrice / 100 <= priceRange[1];
  }

  private isSelectedTopMark(item: Item, itemSettings: ItemSetting): boolean {
    const topMarkList: string[] = itemSettings.marks.top || [];
    if (itemSettings.marks.other?.length >= 3) {
      return !!topMarkList.find(el => item.brand.includes(el.toLowerCase())) || item.brand.includes(itemSettings.marks.other.toLowerCase());
    } else {
      return !!topMarkList.find(el => item.brand.includes(el.toLowerCase()));
    }
  }

  private checkModel(item: Item, itemSettings: ItemSetting): boolean {
    // if (item.nameShop.toLowerCase().includes(itemSettings.marks.alert.toLowerCase())) {
    //   this.alertService.updateAlerts({ [item.brand]: item.nameShop });
    // }
    return true;
  }

  private isSelectedSize(item: Item, itemSettings: ItemSetting): boolean {
    const sizesList: string[] = itemSettings.sizes[item.filterName] || [];
    return sizesList?.length ? !!sizesList.find(el => item.filterValue === el || item.filterValue === 'onesize') : false;
  }

  private isDiscountEnough(item: Item, itemSettings: ItemSetting): boolean {
    return itemSettings.discount ? item.discount >= itemSettings.discount : true;
  }

}
