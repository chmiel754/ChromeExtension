export class Simple {
  sku: string;
  price: number;
  specialPrice: number;
  filterName: string;
  filterValue: string;
  stockStatus: string;
  stockHasReservations: boolean;
  country_sizes: object;

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
