export class ShoppingEvent {
  deliveryPromise: DeliveryPromise;
  campaignId: string;
  endsAt: string;
  startsAt: string;
  deliveryStartsAt: string;
  deliveryEndsAt: string;
  discount: Discount;
  images: {
    banner: Banner,
    campaigns: Campaign[],
    mobile: string;
    upcoming: string;
    logo: string;
  };
  name: string;
  options: Options;
  targetGroups: string[];
  brands: string[];
  tabIds: string[];
  urlPath: string;
  hasLogo: boolean;
  timeLeft: string;
}

interface Campaign {
  aspectRatio: string;
  url: string;
}

interface DeliveryPromise {
  text: string;
  type: string;
}

interface Discount {
  isSpecial: boolean;
  maxDiscount: number;
}

interface Banner {
  horizontal: string;
  vertical: string;
}

interface Options {
  specialTimer: boolean;
}
