import { ParentCategory } from '../enum/parent-category.enum';

export class ItemsController {
  public pants: string[] = ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40', '42', '104', '116', '128',
    '140', '152', '164', '170', '152-164', '164-176', '25x30', '26x30', '27x30', '28x30', '29x30', '30x30', '31x30', '32x30', '33x30',
    '34x30', '25x32', '26x32', '27x32', '28x32', '29x32', '30x32', '31x32', '32x32', '33x32', '34x32', '25x34', '26x34', '27x34', '28x34',
    '29x34', '30x34', '31x34', '32x34', '33x34', '34x34', '24x30', '24x32', '24x34', '28x36', '29x36', '30x36', '31x36', '32x36', '33x36',
    '34x36', '36x30', '36x32', '36x34', '38x32', '38x34', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  public tops: string[] = ['32', '34', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '48', '50', '52', '54', '56', '94',
    '98', '102', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  public dresses: string[] = ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '104', '116', '128', '140', '152', '164',
    '170', 'XS', 'S', 'M', 'L', 'XL'];

  public underwear: string[] = ['32xA', '34xA', '36xA', '30xB', '32xB', '34xB', '36xB', '38xB', '40xB', '30xC', '32xC', '34xC', '36xC',
    '38xC', '40xC', '30xD', '32xD', '34xD', '36xD', '38xD', '30xE', '32xE', '34xE', '36xE', '32xF', '34xF', '32xG', '34xG', '36xG',
    '32', '34', '36', '38', '40', '42', '44', '50', '65B', '65C', '65D',
    '65E', '70A', '70B', '70C',
    '70D', '70E', '75A', '75B', '75C', '75D', '80A', '80B', '80C', '80D', '85B', '85C', 'XXS', 'XS', 'S', 'M', 'L', 'L/XL', 'XL', 'XXL'];

  public shoes: string[] = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];

  public topMarksList: any[] = ['Levi\'s', 'Lacoste', 'Tommy', 'Calvin', 'Dolce', 'Guess', 'Diesel', 'Adidas', 'Ralph', 'Michael', 'LAGERFELD', 'HUGO',
    'BOSS', 'Nike', 'Armani', 'Converse'];

  public manCategories = {
    shoes: [
      {
        parentCategory: ParentCategory.BOOTS,
        name: 'All in Shoes',
        categoryId: '46319661',
      },
      {
        parentCategory: ParentCategory.BOOTS,
        name: 'Boots',
        categoryId: '197377902',
      },
      {
        parentCategory: ParentCategory.BOOTS,
        name: 'Trainers',
        categoryId: '68510924',
      },
      {
        parentCategory: ParentCategory.BOOTS,
        name: 'Open Shoes',
        categoryId: '157275976',
      },
      {
        parentCategory: ParentCategory.BOOTS,
        name: 'Sport Shoes',
        categoryId: '74368050',
      },
    ],
    accessories: [
      {
        parentCategory: ParentCategory.ACCESSORIES,
        name: 'All in accessories',
        categoryId: '178000406',
      },
    ],
    clothes: [
      {
        parentCategory: ParentCategory.CLOTHES,
        name: 'All in Clothing',
        categoryId: '80000687',
      },
      {
        parentCategory: ParentCategory.CLOTHES,
        name: 'Jackets & Coats',
        categoryId: '224638028',
      },
      {
        parentCategory: ParentCategory.CLOTHES,
        name: 'Jumpers & Cardigans',
        categoryId: '186676402',
      },
      {
        parentCategory: ParentCategory.CLOTHES,
        name: 'Shirts',
        categoryId: '102191950',
      },
      {
        parentCategory: ParentCategory.CLOTHES,
        name: 'T-shirts',
        categoryId: '168765739',
      },
      {
        parentCategory: ParentCategory.CLOTHES,
        name: 'Trousers',
        categoryId: '91490450',
      },
      {
        parentCategory: ParentCategory.CLOTHES,
        name: 'Underwear',
        categoryId: '213936528',
      },
    ],
  };

}
