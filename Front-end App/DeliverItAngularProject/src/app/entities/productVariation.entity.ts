import { Shop } from "./shop.entity";

export interface CustomerSelectedFlavour {
  id: string
}

export class ProductVariation {
  id?: string;
  name: string;
  description: string;
  isDisabled?:boolean;
  shop?:Shop|string;
}