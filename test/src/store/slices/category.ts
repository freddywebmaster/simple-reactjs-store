import { createSlice } from 'simple-reactjs-store';

interface Category {
  name: string;
  description: string;
  id: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  actions: {
    getCategories: async function (state, setState) {
      try {
        setState({ ...state, isLoading: true });
        const res = await fetch('http://localhost:8080/categories');
        const data = await res.json();
        return { categories: data, isLoading: false };
      } catch (error) {
        console.log(error);
        return { ...state, isLoading: false };
      }
    },
  },
});

export const { getCategories } = categorySlice.actions;
