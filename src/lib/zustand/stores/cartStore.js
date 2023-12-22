import { create } from 'zustand'

export const cartStore = create()((set, get) => ({
  productsVariants: [],
  productVariant: null,
  addToCart: (values) => {
    const newList = [...get().productsVariants, values];
    set({productsVariants: newList})
  },
  subtractCart: (productId) => {
    const newList = get().productsVariants.filter((product) => product.id !== productId);
    set({productsVariants: newList})
  }
}))
