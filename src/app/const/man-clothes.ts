import { CategoryItem } from '../interfaces/category-item';
import { ParentCategory } from '../enum/parent-category.enum';

export const manClothes: CategoryItem[] = [
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
];
