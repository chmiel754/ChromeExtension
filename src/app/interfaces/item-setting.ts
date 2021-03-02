export interface ItemSetting {
  categories: { accessories: string[], clothes: string[], shoes: string[] };
  marks: { top: string[], other: string };
  prices: { accessories: number[], others: number[], pants: number[], shoes: number[], tops: number[], underwear: number[] };
  sizes: { pants: string[], shoes: string[], tops: string[], underwear: string[] };
  discount: number;
  models: string[];
}
