import React from "react";
import { IProduct } from "../src/models/IProduct";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ICartItem {
  name: string | undefined;
  image: string | undefined;
  product: IProduct;
  quantity: number;
}

interface ICartContext {
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
  decreaseQuantity: (product: IProduct) => void; // Lägg till denna rad
  clearCart: () => void;
}

const initialValues: ICartContext = {
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
};

const CartContext = createContext<ICartContext>(initialValues);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<ICartItem[]>(() => {
    const lsData = localStorage.getItem("cart");
    return lsData ? JSON.parse(lsData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (product: IProduct) => {
    const clonedCart = [...cart];

    const existingProduct = clonedCart.find(
      (item) => item.product._id === product._id
    );

    if (existingProduct) {
      existingProduct.quantity++;
      setCart(clonedCart);
    } else {
      setCart([
        ...clonedCart,
        {
          product,
          quantity: 1,
          name: undefined,
          image: undefined,
        },
      ]);
    }
  };

  const removeFromCart = (product: IProduct) => {
    const clonedCart = [...cart];

    const existingProduct = clonedCart.find(
      (item) => item.product._id === product._id
    );

    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        const index = clonedCart.findIndex(
          (item) => item.product._id === product._id
        );
        clonedCart.splice(index, 1);
      }

      setCart(clonedCart);
    }
  };

  const decreaseQuantity = (product: IProduct) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === product._id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity, // Lägg till detta
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
