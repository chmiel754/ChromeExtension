import { Injectable } from '@angular/core';
import { ZalandoApiService } from '../services/zalando-api.service';
import { HttpClient } from '@angular/common/http';
import { SniperStatus } from '../enum/sniper-status.enum';
import { ZalandoItemSimple } from '../interfaces/zalando-item-simple';
import { ZalandoItemOrderMutation } from '../interfaces/zalando-item-order-mutation';
import { ChromeExtensionsService } from '../services/chrome-extensions.service';
import { zalandoHtmlMock } from '../mock/zalando-item.mock';

@Injectable({
  providedIn: 'root',
})
export class ZalandoScraperService {

  public audio: HTMLAudioElement = new Audio('https://www.freesoundslibrary.com/wp-content/uploads/2018/02/ding-dong-sound-effect.mp3');

  private readonly userId: string = 'e7f9dfd05f6b992d05ec8d79803ce6a6bcfb0a10972d4d9731c6b94f6ec75033';

  public status: SniperStatus = SniperStatus.STOPPED;
  public interval = 2000;

  private readonly simplesId = '7ce649a594cfe524666a0806703aac409a0c8ac989cb478c819b970e9d0d792e';

  constructor(private zalandoApiService: ZalandoApiService,
              public chromeExtensionsService: ChromeExtensionsService,
              private http: HttpClient) {
    this.audio.load();
  }

  getItemPageData(key: string) {
    return this.http.get(this.zalandoApiService.getItemDetails(key), { responseType: 'text' }).toPromise();
    // return Promise.resolve(zalandoHtmlMock);
  }

  getAllSimplesMap(res: string): Map<string, ZalandoItemSimple> {
    const simplesMap: Map<string, ZalandoItemSimple> = new Map();
    try {
      const temp = res.substr(res.indexOf(this.simplesId) - 8);
      const simples: any[] = JSON.parse(temp.slice(temp.indexOf('['), temp.indexOf('],') + 1));
      simples.forEach(el => simplesMap.set(el.size, el));
      return simplesMap;
    } catch {
      console.log('Parsing error');
      return simplesMap;
    }
  }

  getALlSimplesList(res: string): ZalandoItemSimple[] {
    try {
      const temp = res.substr(res.indexOf(this.simplesId) - 8);
      return JSON.parse(temp.slice(temp.indexOf('['), temp.indexOf('],') + 1));
    } catch {
      console.log('Parsing error');
      return [];
    }
  }

  getIntoOrderList(itemList: ZalandoItemSimple[]): Promise<any> {
    const list: ZalandoItemOrderMutation[] = itemList.map(el => this.getOrderItem(el.sku));
    return list.length ? this.orderItems(list) : Promise.reject();
  }

  private orderItems(list: ZalandoItemOrderMutation[]): Promise<any> {
    return this.http.post(this.zalandoApiService.getZalandoGqlAddress(), list).toPromise()
      .then(() => this.chromeExtensionsService.openNewTab(this.zalandoApiService.getOrderListAddress()))
      .then(() => this.audio.play());
  }

  getOrderItem(sku: string): ZalandoItemOrderMutation {
    return {
      id: this.userId,
      variables: {
        addToCartInput: {
          productId: sku,
          clientMutationId: 'addToCartMutation',
        },
      },
    };
  }
}
