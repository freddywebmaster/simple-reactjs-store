/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSimpleState } from 'simple-reactjs-store';
import { categorySlice, getCategories } from '../store/slices/category';

const BookForm = () => {
  const categoryState = useSimpleState(categorySlice);
  const { categories, isLoading } = categoryState.data;

  useEffect(() => {
    categoryState.exec(getCategories);
  }, []);

  return (
    <div>
      <h2>Create Book</h2>
      <form>
        <select name="categories">
          <option value="">{isLoading ? 'Loading...' : 'Select category'}</option>

          {categories.length !== 0 &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </form>
    </div>
  );
};

export default BookForm;
