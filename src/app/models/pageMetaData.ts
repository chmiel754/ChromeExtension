import { ShoppingEvent } from './shoppingEvent.model';

export class PageMetaData {
  mylounge: {
    openCampaigns: ShoppingEvent[];
    upcomingCampaigns: ShoppingEvent[];
  };
}
