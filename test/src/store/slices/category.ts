import { createSlice } from 'simple-reactjs-store';

interface Category {
  name: string;
  description: string;
  id: string;
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState: [] as Category[],
  actions: {
    getCategories: async function (state, setState) {
      const res = await fetch('http://localhost:8080/categories')
      const data = await res.json();
      setState && setState(data);
    },
  },
});

//@ts-ignore
export const { getCategories } = categorySlice.actions;
