import { IProduct } from "../models/IProduct";

interface ICartProps {
  cart: IProduct[];
}

export const Cart = ({ cart }: ICartProps) => {
  return (
    <>
      <h2>Cart</h2>
      <ul>
        {cart.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price} kr
          </li>
        ))}
      </ul>
      {cart.length > 0 && <button>Pay</button>}
    </>
  );
};
