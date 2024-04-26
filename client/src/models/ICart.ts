import { IProduct } from "./IProduct";

export interface ICart {
  name: string | undefined;
  image: string | undefined;
  product: IProduct;
  quantity: number;
}
