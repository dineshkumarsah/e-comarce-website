import { Category } from "./categories.model";

export interface product {
    _id: string;
    name: string;
    price: number;
    category: Category;
    productImage: string;
  }