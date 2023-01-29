import { createSlice } from 'simple-reactjs-store';
import { productService } from '../../services/product';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  isVisible: boolean;
  image: string;
}

interface ProducState {
  isLoading: boolean;
  products: Product[];
  updatingProduct: Product | null;
}

const initialState: ProducState = {
  isLoading: false,
  products: [],
  updatingProduct: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  actions: {
    getProducts: async (state, setState) => {
      setState({ ...state, isLoading: true });
      try {
        const { data } = await productService.getProducts();
        console.log(data);

        setState({ ...state, products: data, isLoading: false });
      } catch (error) {
        setState({ ...state, isLoading: false });
      }
    },
    createProduct: async (state, setState, payload: Product) => {
      setState({ ...state, isLoading: true });
      try {
        await productService.createProduct(payload);
        setState({ ...state, products: [...state.products, payload], isLoading: false });
      } catch (error) {
        setState({ ...state, isLoading: false });
      }
    },
  },
});

export const { getProducts, createProduct, updateProduct } = productSlice.actions;
