import { IProduct } from "./IProduct";

export interface ICart {
  name: string | undefined;
  image: string | undefined;
  product: IProduct;
  quantity: number;
}

export interface ICartItem {
  name: string | undefined;
  image: string | undefined;
  product: IProduct;
  quantity: number;
}

export interface ICartContext {
  cart: ICart[];
  increaseCart: (product: IProduct) => void;
  decreaseCart: (product: IProduct) => void;
  deleteCart: (product: IProduct) => void;
  clearCart: () => void;
}
