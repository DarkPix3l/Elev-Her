import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (product, size, color) =>
    set((state) => {
      const cartId = `${product.id}-${size}-${color}`;
      const existing = state.cartItems.find((item) => item.cartId === cartId);

      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      return {
        cartItems: [
          ...state.cartItems,
          {
            ...product,
            selectedSize: size,
            selectedColor: color,
            quantity: 1,
            cartId,
          },
        ],
      };
    }),

  removeFromCart: (cartId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.cartId !== cartId),
    })),

  updateQuantity: (cartId, quantity) =>
    set((state) => {
      if (quantity === 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.cartId !== cartId),
        };
      }

      return {
        cartItems: state.cartItems.map((item) =>
          item.cartId === cartId ? { ...item, quantity } : item
        ),
      };
    }),

  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
