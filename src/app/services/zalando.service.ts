import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChromeExtensionsService } from './chrome-extensions.service';
import { ItemRequest } from '../models/itemRequest.model';

@Injectable({
  providedIn: 'root',
})
export class ZalandoService {

  private readonly url: (tenant: string) => string = (tenant: string) => `https://www.zalando.${tenant}/api/catalog/articles?size=1000&`;

  constructor(private http: HttpClient,
              private chromeExtensionsService: ChromeExtensionsService) {
  }

  getZalandoPrice(item: ItemRequest, tenant: string = 'PL') {
    return this.http.get<any>(this.getUrl(item, tenant))
      .toPromise()
      .then(r => r.articles?.length ?
        this.chromeExtensionsService.log(`Original price: ${r.articles.price.original}, Promotional: ${r.article?.price.promotional}`)
        : this.chromeExtensionsService.log(`Nothing found: ${this.getUrl(item, tenant)}`),
      );
  }

  getUrl(item: ItemRequest, tenant): string {
    return `${this.url(tenant)}skus=${item.sku}`;
  }
}
