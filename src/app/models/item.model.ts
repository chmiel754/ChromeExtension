import { Simple } from './simple.model';
import { ItemRequest } from './itemRequest.model';

export class Item extends Simple {
  discount: number;
  urlPath: string;
  images: string[];
  brand: string;
  brandCode: string;
  nameCategoryTag: string;
  campaignIdentifier: string;
  configSku: string;
  nameShop: string

  constructor(data: { article: ItemRequest; simple: Simple }) {
    super(data.simple);
    this.discount = this.calcDiscount(data.simple);
    this.urlPath = data.article.urlPath[45];
    this.images = data.article.images;
    this.brand = data.article.brand?.toLowerCase();
    this.brandCode = data.article.brandCode;
    this.nameCategoryTag = data.article.nameCategoryTag;
    this.campaignIdentifier = data.article.campaignIdentifier;
    this.configSku = data.article.sku;
    this.nameShop = data.article.nameShop;
  }

  private calcDiscount(item: Simple): number {
    return (item.price - item.specialPrice) / (item.price / 100);
  }
}
