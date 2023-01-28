import { useEffect } from 'react';
import { useSimpleState } from 'simple-reactjs-store';
import { categorySlice, getCategories } from '../store/slices/category';

const BookForm = () => {
  const categories = useSimpleState(categorySlice);

  useEffect(() => {
    categories.exec(getCategories, "");
  }, []);

  return (
    <div>
      <h2>Create Book</h2>
      <form></form>
    </div>
  );
};

export default BookForm;
