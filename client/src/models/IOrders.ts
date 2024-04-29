import { ReactNode } from "react";

export interface ICustomer {
  _id: string;
  address: string;
}

export interface ILineItem {
  amount: ReactNode;
  _id: string;
  linkedProduct: {
    image: string | undefined;
    name: string;
  };
  quantity: number;
}

export interface IOrder {
  linkedCustomer: ICustomer;
  _id: string;
  customer: string | null;
  address: string | null;
  orderDate: string;
  status: string;
  totalPrice: number;
  paymentId: string | null;
  lineItems: ILineItem[];
}
