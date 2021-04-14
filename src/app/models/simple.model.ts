import { StockStatus } from '../enum/stock-status.enum';

export class Simple {
  sku: string;
  price: number;
  specialPrice: number;
  filterName: string;
  filterValue: string;
  stockStatus: StockStatus;
  stockHasReservations: boolean;
  country_sizes: object;
  supplier_size: string;
  supplier_size_country: string;

  constructor(source: any) {
    this.sku = source.sku;
    this.price = source.price;
    this.specialPrice = source.specialPrice;
    this.filterName = source.filterName;
    this.filterValue = source.filterValue;
    this.stockStatus = source.stockStatus;
    this.stockHasReservations = source.stockHasReservations;
    this.country_sizes = source.country_sizes;
  }
}
