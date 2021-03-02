import { Media } from './media.model';
import { Simple } from './simple.model';

export class ItemRequest {
  attributes?: { is_wearable: boolean };
  sku: string;
  brand: string;
  brandCode: string;
  categoryId?: number;
  images: string[];
  media: Media[];
  subtitle: string;
  nameCategoryTag: string;
  nameShop: string;
  nameColor: string;
  urlPath: { 45: string};
  silhouette: string;
  price: number;
  specialPrice: number;
  similarPrices: boolean;
  simples: Simple[];
  hasSimilar: boolean;
  campaignIdentifier: string;
  savings: number;
  gender: string[];
  stockStatus: string;
}
