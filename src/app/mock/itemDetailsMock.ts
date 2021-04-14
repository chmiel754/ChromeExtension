import { ItemRequest } from '../models/itemRequest.model';
import { StockStatus } from '../enum/stock-status.enum';

export const itemDetails: ItemRequest = {
  attributes: {
    heel_form: 'Kształt obcasa: płaski',
    sole_material: 'Podeszwa: tworzywo sztuczne',
    is_wearable: true,
    decksohle: 'Wyściółka: skóra',
    futter: 'materiał wewnętrzny: skóra',
    fastening: 'Zapięcie: sznurowanie',
    upper_material: 'Materiał: skóra',
    shoe_toecap: 'Nosek buta: okrągły'
  },
  sku: 'JO912O00K-O11',
  brand: 'JOOP!',
  brandCode: 'JO9',
  categoryId: 60457365,
  description: [
    {
      type: 'list',
      headline: 'details',
      elements: [
        'Kształt obcasa: płaski',
        'Nosek buta: okrągły',
        'Zapięcie: sznurowanie',
        'Numer artykułu: JO912O00K-O11'
      ]
    },
    {
      type: 'list',
      headline: 'material',
      elements: [
        'Wyściółka: skóra',
        'materiał wewnętrzny: skóra',
        'Podeszwa: tworzywo sztuczne',
        'Materiał: skóra'
      ]
    }
  ],
  images: [
    'spp-media-p1/57ce70a3264b34629a9875b26704b019/dea9f589693748dbb4160d21e180f789.jpg',
    'spp-media-p1/9e58e19938ee3fc4b4a55c1b8a0b743a/1b92166561634e5186c929f496a4bebd.jpg',
    'spp-media-p1/4bac45cd189435cca87564af3bbd440b/543cc50b40074ed999c8e4475d802279.jpg',
    'spp-media-p1/dfb52696cc1c3e88ac5f050171d0cf47/7fa989fb2aa04ec9bd2bf70a276ffbfd.jpg',
    'spp-media-p1/7b470ba7c1083cfba507d084d7e4a5f0/ac49fe168f394847a3edd775927ab4ae.jpg',
    'spp-media-p1/f847600d1b003c3a8451586cc3a8f894/0b953589cfb545779b330504113d8a7d.jpg',
    'spp-media-p1/c747fe508b5933c999cffaada28ec982/feba85a641ff4a70b3826e16c6d67fd6.jpg'
  ],
  media: [
    {
      media_type: 'IMAGE',
      character_code: 'PREMIUM',
      path: 'spp-media-p1/57ce70a3264b34629a9875b26704b019/dea9f589693748dbb4160d21e180f789.jpg'
    },
    {
      media_type: 'IMAGE',
      character_code: 'NON_MODEL',
      path: 'spp-media-p1/9e58e19938ee3fc4b4a55c1b8a0b743a/1b92166561634e5186c929f496a4bebd.jpg'
    },
    {
      media_type: 'IMAGE',
      character_code: 'NON_MODEL',
      path: 'spp-media-p1/4bac45cd189435cca87564af3bbd440b/543cc50b40074ed999c8e4475d802279.jpg'
    },
    {
      media_type: 'IMAGE',
      character_code: 'NON_MODEL',
      path: 'spp-media-p1/dfb52696cc1c3e88ac5f050171d0cf47/7fa989fb2aa04ec9bd2bf70a276ffbfd.jpg'
    },
    {
      media_type: 'IMAGE',
      character_code: 'NON_MODEL',
      path: 'spp-media-p1/7b470ba7c1083cfba507d084d7e4a5f0/ac49fe168f394847a3edd775927ab4ae.jpg'
    },
    {
      media_type: 'IMAGE',
      character_code: 'NON_MODEL',
      path: 'spp-media-p1/f847600d1b003c3a8451586cc3a8f894/0b953589cfb545779b330504113d8a7d.jpg'
    },
    {
      media_type: 'IMAGE',
      character_code: 'NON_MODEL',
      path: 'spp-media-p1/c747fe508b5933c999cffaada28ec982/feba85a641ff4a70b3826e16c6d67fd6.jpg'
    }
  ],
  taxCode: 100,
  subtitle: '',
  nameShop: 'SNEAKER',
  nameCategoryTag: 'Sneakersy niskie',
  nameColor: 'brązowy',
  urlPath: {
    45: '/campaigns/ZZO1B6L/categories/60457365/articles/JO912O00K-O11'
  },
  targetGroups: [
    'GENDER_MALE',
    'AGE_GROUP_ADULT',
    'ARTICLE_DOMAIN_DEFAULT'
  ],
  modelSku: 'JO912O00K',
  silhouette: 'sneaker',
  sizechartUrl: '/sizechart/man/shoes',
  price: 66500,
  specialPrice: 31900,
  similarPrices: true,
  simples: [
    {
      sku: 'JO912O00K-O110400000',
      price: 66500,
      specialPrice: 31900,
      filterName: 'shoes',
      filterValue: '40',
      stockStatus: StockStatus.AVAILABLE,
      stockHasReservations: false,
      country_sizes: {
        eu: '40',
        uk: '6.5',
        it: '40',
        fr: '40',
        us: 'null'
      },
      supplier_size: '40',
      supplier_size_country: 'eu'
    },
    {
      sku: 'JO912O00K-O110410000',
      price: 66500,
      specialPrice: 31900,
      filterName: 'shoes',
      filterValue: '41',
      stockStatus: StockStatus.SOLD_OUT,
      stockHasReservations: false,
      country_sizes: {
        eu: '41',
        uk: '7.5',
        it: '41',
        fr: '41',
        us: 'null'
      },
      supplier_size: '41',
      supplier_size_country: 'eu'
    },
    {
      sku: 'JO912O00K-O110420000',
      price: 66500,
      specialPrice: 31900,
      filterName: 'shoes',
      filterValue: '42',
      stockStatus: StockStatus.AVAILABLE,
      stockHasReservations: false,
      country_sizes: {
        eu: '42',
        uk: '8',
        it: '42',
        fr: '42',
        us: 'null'
      },
      supplier_size: '42',
      supplier_size_country: 'eu'
    },
    {
      sku: 'JO912O00K-O110430000',
      price: 66500,
      specialPrice: 31900,
      filterName: 'shoes',
      filterValue: '43',
      stockStatus: StockStatus.SOLD_OUT,
      stockHasReservations: false,
      country_sizes: {
        eu: '43',
        uk: '9',
        it: '43',
        fr: '43',
        us: 'null'
      },
      supplier_size: '43',
      supplier_size_country: 'eu'
    },
    {
      sku: 'JO912O00K-O110440000',
      price: 66500,
      specialPrice: 31900,
      filterName: 'shoes',
      filterValue: '44',
      stockStatus: StockStatus.AVAILABLE,
      stockHasReservations: false,
      country_sizes: {
        eu: '44',
        uk: '9.5',
        it: '44',
        fr: '44',
        us: 'null'
      },
      supplier_size: '44',
      supplier_size_country: 'eu'
    },
    {
      sku: 'JO912O00K-O110450000',
      price: 66500,
      specialPrice: 31900,
      filterName: 'shoes',
      filterValue: '45',
      stockStatus: StockStatus.AVAILABLE,
      stockHasReservations: false,
      country_sizes: {
        eu: '45',
        uk: '10.5',
        it: '45',
        fr: '45',
        us: 'null'
      },
      supplier_size: '45',
      supplier_size_country: 'eu'
    },
    {
      sku: 'JO912O00K-O110460000',
      price: 66500,
      specialPrice: 31900,
      filterName: 'shoes',
      filterValue: '46',
      stockStatus: StockStatus.AVAILABLE,
      stockHasReservations: false,
      country_sizes: {
        eu: '46',
        uk: '11',
        it: '46',
        fr: '46',
        us: 'null'
      },
      supplier_size: '46',
      supplier_size_country: 'eu'
    }
  ],
  colorFamilyKey: 700,
  hasSimilar: true,
  campaignIdentifier: 'ZZO1B6L',
  savings: 53,
  gender: [
    'male'
  ],
  stockStatus: StockStatus.AVAILABLE,
  filters: [
    {
      type: 'same_category',
      title: {
        category: 'Sneakersy'
      },
      filter: {
        category_filter: '60457365'
      },
      count: 746
    },
    {
      type: 'same_color',
      title: {
        color: 'brązowy'
      },
      filter: {
        color_filter: '700'
      },
      count: 48
    },
    {
      type: 'same_category_color',
      title: {
        color: 'brązowy',
        category: 'Sneakersy'
      },
      filter: {
        color_filter: '700',
        category_filter: '60457365'
      },
      count: 35
    }
  ]
};
