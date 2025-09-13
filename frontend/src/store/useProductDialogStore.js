import { create } from 'zustand';

const useProductDialogStore = create((set) => ({
  selectedProduct: null,
  selectedSize: '',
  selectedColor: '',
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setSelectedSize: (size) => set({ selectedSize: size }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  reset: () =>
    set({
      selectedProduct: null,
      selectedSize: '',
      selectedColor: '',
    }),
}));

export default useProductDialogStore;
