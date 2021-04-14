import { Media } from './media.model';
import { Simple } from './simple.model';
import { Attribute } from './attribute.model';

export class ItemRequest {
  attributes?: Attribute;
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
  description: any[];
  taxCode: number;
  targetGroups: string[];
  modelSku: string;
  sizechartUrl: string;
  colorFamilyKey: number;
  filters: any[];
}
