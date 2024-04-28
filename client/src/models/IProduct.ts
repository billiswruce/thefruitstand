export interface IProduct {
  quantity: number;
  product: any;
  _id: string;
  name: string;
  price: number;
  image: string;
}

export interface ICreateProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  inStock: number;
  status: string;
  image: string;
}

export interface IAddProduct {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: ICreateProduct) => void;
}

export interface editProduct {
  open: boolean;
  onClose: () => void;
  openEdit: (productId: string, product: ICreateProduct) => void;
  productId: string;
  product: ICreateProduct;
}
