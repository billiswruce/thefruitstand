import { ReactNode } from "react";

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
  customerEmail: string;
  _id: string;
  customer: string | null;
  address: string | null;
  orderDate: string;
  status: string;
  totalPrice: number;
  paymentId: string | null;
  lineItems: ILineItem[];
}
