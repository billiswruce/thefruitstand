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
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  decreaseQuantity: (product: IProduct) => void; // Lägg till denna rad
  clearCart: () => void;
}
