import { apiClient } from '.';
import { Book } from '../store/slices/book';

const getBooks = async () => await apiClient.get('/books');
const createBook = async (book: Book) => await apiClient.post('/books', book);
const updateBook = async (id: string) => await apiClient.put(`/books/${id}`);

export const BookService = {
  getBooks,
  createBook,
  updateBook,
};
