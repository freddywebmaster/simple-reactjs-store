import { createSlice } from 'simple-reactjs-store';
import { BookService } from '../../services/book';

export interface Book {
  id: number | number;
  name: string;
  image: string;
  category: string | number;
}

interface BookState {
  isLoading: boolean;
  isCreating: boolean;
  books: Book[];
  updatingBook: Book | null;
}

const initialState: BookState = {
  isLoading: false,
  books: [],
  updatingBook: null,
  isCreating: false,
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  actions: {
    getBooks: async (state, setState) => {
      setState({ isLoading: true });
      try {
        const { data } = await BookService.getBooks();
        return { books: data, isLoading: false };
      } catch (error) {
        return { isLoading: false };
      }
    },
    createBook: async (state, setState, payload: Book) => {
      setState({ ...state, isCreating: true });
      try {
        await BookService.createBook(payload);
        return { ...state, books: [...state.books, payload], isCreating: false };
      } catch (error) {
        return { ...state, isCreating: false };
      }
    },
  },
});

export const { getBooks, createBook } = bookSlice.actions;
