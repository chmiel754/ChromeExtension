import { ItemRequest } from '../../models/itemRequest.model';

export class ZalandoItemCategoriesMap {

  items: Map<string, number> = new Map();

  check(itemList: ItemRequest[]) {
    this.clear();
    itemList.forEach(item => {
      if (this.items.has(item.nameCategoryTag)) {
        this.items.set(item.nameCategoryTag, this.items.get(item.nameCategoryTag) + 1);
      } else {
        this.items.set(item.nameCategoryTag, 1);
      }
    });
  }

  clear() {
    this.items.clear();
  }

  getCategories(): IterableIterator<string> {
    return this.items.keys();
  }

  getCategoriesItemsAmount(key: string): number {
    return this.items.get(key);
  }

}
