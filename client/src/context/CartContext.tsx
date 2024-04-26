import { IProduct } from "../models/IProduct";
import { ICart } from "../models/ICart";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ICartContext {
  cart: ICart[];
  increaseCart: (product: IProduct) => void;
  decreaseCart: (product: IProduct) => void;
  deleteCart: (product: IProduct) => void;
  clearCart: () => void;
}

const initialValues: ICartContext = {
  cart: [],
  increaseCart: () => {},
  decreaseCart: () => {},
  deleteCart: () => {},
  clearCart: () => {},
};

const CartContext = createContext<ICartContext>(initialValues);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<ICart[]>(() => {
    const lsData = localStorage.getItem("cart");
    return lsData ? JSON.parse(lsData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const increaseCart = (product: IProduct) => {
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

  const decreaseCart = (product: IProduct) => {
    const updatedCart = cart.map((item) => {
      if (item.product._id === product._id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const deleteCart = (product: IProduct) => {
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

  return (
    <CartContext.Provider
      value={{
        cart,
        increaseCart,
        decreaseCart,
        deleteCart,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};
