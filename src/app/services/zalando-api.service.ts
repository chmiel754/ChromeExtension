import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZalandoApiService {

  private serverAddress: (tenant: string) => string = (t) => `https://www.zalando.${t}`;

  getServerAddress(): string {
    return this.serverAddress('PL');
  }

  getItemList(sku: string): string {
    return `${this.getServerAddress()}/api/catalog/articles?skus=${sku}`;
  }

  getItemDetails(key: string) {
    return `${this.getServerAddress()}/${key}.html`;
  }

  getZalandoGqlAddress() {
    return `${this.getServerAddress()}/api/graphql/`;
  }

  getOrderListAddress() {
    return `${this.getServerAddress()}/cart/`;
  }

}
