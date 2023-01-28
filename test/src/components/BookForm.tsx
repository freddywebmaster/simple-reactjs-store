/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSimpleState } from '../freddyLib';
import { categorySlice, getCategories } from '../store/slices/category';

const BookForm = () => {
  //init the hook with your state
  const categoryState = useSimpleState(categorySlice);
  //if your state is big you can desctructure data
  const { categories, isLoading } = categoryState.data;

  useEffect(() => {
    //On Init this component execute the action only pass the action... Don't call your FN
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
