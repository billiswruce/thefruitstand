import { ReactNode } from "react";

export interface LinkedCustomer {
  _id: string;
}

export interface LineItem {
  amount: ReactNode;
  _id: string;
  linkedProduct: {
    name: string;
  };
  quantity: number;
}

export interface Order {
  _id: string;
  customer: string | null;
  orderDate: string;
  status: string;
  totalPrice: number;
  paymentId: string | null;
  linkedCustomer: LinkedCustomer;
  lineItems: LineItem[];
}
