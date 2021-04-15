import { ItemRequest } from '../models/itemRequest.model';
import { Item } from '../models/item.model';
import { ChromeExtensionsService } from './chrome-extensions.service';
import { OrderRequest } from '../interfaces/order-request';
import { Simple } from '../models/simple.model';

export class ModelParser {
  static parseToItemList(articlesList: ItemRequest[]): Item[] {
    const loggerService: ChromeExtensionsService = new ChromeExtensionsService();
    loggerService.log(`Items ${articlesList.length}`);
    const results: Item[] = [];
    articlesList.forEach((el: ItemRequest) => el?.simples.forEach(i => results.push(new Item({ article: el, simple: i }))));
    return results;
  }

  static parseItemToOrderRequest(item: Item): OrderRequest {
    return {
      quantity: 1,
      campaignIdentifier: item.campaignIdentifier,
      configSku: item.configSku,
      simpleSku: item.sku,
      additional: { reco: 0 },
      ignoreExceptionCodes: [
        506,
        509,
      ],
    };
  }

  static itemRequestToSimpleItem(itemRequest: ItemRequest): Item {
    return new Item({
      article: itemRequest,
      simple: new Simple({ specialPrice: itemRequest.specialPrice, filterName: itemRequest.simples[0].filterName }),
    });
  }
}
