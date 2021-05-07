import { ItemRequest } from '../../models/itemRequest.model';
import * as _ from 'lodash';
import { ZalandoItemCategoriesMap } from './zalando-item-categories-map';

export class ZalandoItemList {

  items: ItemRequest[] = [];

  setItemList(items: ItemRequest[]): void {
    this.items = items || [];
  }

  getItemList(): ItemRequest[] {
    return this.items;
  }

  clearItemList(): void {
    this.items = [];
  }

  sortByDiscount() {
    this.items.sort((a, b) => a.savings > b.savings ? -1 : 1);
  }

  sortByPrice() {
    this.items.sort((a, b) => a.specialPrice < b.specialPrice ? -1 : 1);
  }

  sortEmptyModelsFirst() {
    this.items.sort((a) => _.isEmpty(a.nameShop) ? -1 : 1);
  }

  sortByModels(model: string) {
    this.items.sort((a, b) => a.brand.toLowerCase().includes(model.toLowerCase()) ? -1 : 1);
  }

  sortByCategory(categoryTag: string) {
    this.items.sort((a, b) => a.nameCategoryTag === categoryTag ? -1 : 1);
  }

  sortByBrand(brand: string) {
    this.items.sort((a) => a.brand.toLowerCase() === brand.toLowerCase() ? -1 : 1);
  }

}
