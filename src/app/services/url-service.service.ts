import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlServiceService {

  private itemFilters: string;
  private campaignCode: string;

  constructor() {
    this.itemFilters = localStorage.getItem('itemFilters');
    this.campaignCode = localStorage.getItem('campaignCode');
  }

  saveCampaignCode(campaignCode: string) {
    this.campaignCode = campaignCode;
    localStorage.setItem('campaignCode', this.campaignCode);
  }

  saveItemFilters(formValue) {
    this.itemFilters = new EventItemsFiltersBuilder()
      .setTops(formValue.sizes.tops)
      .setShoes(formValue.sizes.shoes)
      .setPants(formValue.sizes.tops)
      .setUnderwear(formValue.sizes.underwear)
      .setCategories(formValue.categories)
      .build();

    localStorage.setItem('itemFilters', this.itemFilters);
  }

}

class EventItemsFiltersBuilder {

  private readonly spaceSign = '%7C';

  private tops = '';
  private pants = '';
  private underwear = '';
  private shoes = '';
  private categoryIds = '';

  constructor() {
  }

  setCategories(categories): EventItemsFiltersBuilder {
    const categoriesArray = [
      ...categories.accessories ? categories.accessories : [],
      ...categories.shoes ? categories.shoes : [],
      ...categories.clothes ? categories.clothes : [],
    ];
    if (categoriesArray.length) {
      this.categoryIds = '&category_ids=' + categoriesArray.join();
    }
    return this;
  }

  setTops(sizesList: string[]): EventItemsFiltersBuilder {
    if (sizesList?.length) {
      this.tops = '&sizes.tops=' + sizesList.join(this.spaceSign);
    }
    return this;
  }

  setPants(sizesList: string[]): EventItemsFiltersBuilder {
    if (sizesList?.length) {
      this.pants = '&sizes.pants=' + sizesList.join(this.spaceSign);
    }
    return this;
  }

  setUnderwear(sizesList: string[]): EventItemsFiltersBuilder {
    if (sizesList?.length) {
      this.underwear = '&sizes.underwear=' + sizesList.join(this.spaceSign).replace('/', '%2F');
    }
    return this;
  }

  setShoes(sizesList: string[]): EventItemsFiltersBuilder {
    if (sizesList?.length) {
      this.shoes = '&sizes.shoes=' + sizesList.join(this.spaceSign);
    }
    return this;
  }

  build(): string {
    return this.generateFilters();
  }

  private generateFilters(): string {
    return '/articles?size=1000&'
      + this.categoryIds + this.shoes + this.underwear + this.pants + this.tops;
  }
}
