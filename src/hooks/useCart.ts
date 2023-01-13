import create from "zustand";
import type { CartProduct } from "../helpers/types";
import { persist } from "zustand/middleware";

interface CartStore {
  cart: CartProduct[];
  total: number;
  quantity: number;
  addToCart: ({}: CartProduct) => void;
  removeItem: (id: string, price: number) => void;
  resetCart: () => void;
}

const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      total: 0,
      quantity: 0,
      addToCart: ({ ...props }: CartProduct) =>
        set((state) => ({
          cart: [...state.cart, props],
          total: state.total + props.price,
          quantity: state.quantity + 1,
        })),
      removeItem: (id: string, price: number) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.prodId !== id),
          total: state.total - price,
          quantity: state.quantity - 1,
        }));
      },
      resetCart: () => {
        set(() => ({
          cart: [],
          total: 0,
          quantity: 0,
        }));
      },
    }),
    {
      name: "cart-data",
      partialize: (state) => ({
        cart: state.cart,
        total: state.total,
        quantity: state.quantity,
      }),
    }
  )
);

export default useCart;
