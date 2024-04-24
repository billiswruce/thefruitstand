// Purpose: Interface for Product

export interface IProduct {
  quantity: number;
  product: any;
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
  status: string;
}
