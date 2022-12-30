import { number } from "zod";
import create from "zustand";
import { CartProduct } from "../helpers/types";

interface CartStore {
  cart: CartProduct[];
  total: number;
  quantity: number;
  addToCart: ({}: CartProduct) => void;
  // adjustQuantity: (
  //     id: string,
  //     action: 'add' | 'remove',
  //     amount: number
  // ) => void;
  // adjustTotal: (amount: number, action: 'add' | 'remove') => void;
  removeItem: (id: string) => void;
  resetCart: () => void;
}

const useCart = create<CartStore>((set) => ({
  cart: [],
  total: 0,
  quantity: 0,
  addToCart: ({ ...props }: CartProduct) =>
    set((state) => ({
      cart: [...state.cart, props],
      total: state.total + props.price,
      totalItems: state.quantity + 1,
    })),
  // adjustQuantity: (id: string, action: 'add' | 'remove', amount: number) => {
  //   if (action === 'add') {
  //     set((state) => ({
  //       cart: state.cart.map((item) =>
  //         item.prodId === id
  //           ? ({
  //               ...item,
  //               quantity: item.quantity + amount,
  //             } as CartProduct)
  //           : item
  //       ),
  //       totalItems: state.totalItems + amount,
  //     }));
  //   } else {
  //     set((state) => ({
  //       cart: state.cart.map((item) =>
  //         item.id === id
  //           ? ({
  //               ...item,
  //               quantity: item.quantity - amount,
  //             } as CartProduct)
  //           : item
  //       ),
  //       totalItems: state.totalItems - amount,
  //     }));
  //   }
  // },
  // adjustTotal: (amount: number, action: 'add' | 'remove') => {
  //   if (action === 'add') {
  //     set((state) => ({
  //       total: state.total + amount,
  //     }));
  //   } else {
  //     set((state) => ({
  //       total: state.total - amount,
  //     }));
  //   }
  // },
  removeItem: (id: string) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.prodId !== id),
    }));
  },
  resetCart: () => {
    set(() => ({
      cart: [],
      total: 0,
      totalItems: 0,
    }));
  },
}));

export default useCart;
