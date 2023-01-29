/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSimpleState } from 'simple-reactjs-store';
import { getBooks, bookSlice } from '../store/slices/book';

const BookList = () => {
  const bookState = useSimpleState(bookSlice);
  const { books, isLoading } = bookState.data;

  useEffect(() => {
    bookState.exec(getBooks);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-2xl">
      <h2 className='font-bold text-2xl mb-2 text-gray-700 text-center'>Book list</h2>

      {isLoading ? (
        <p>loading products...</p>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            <p>{book.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
