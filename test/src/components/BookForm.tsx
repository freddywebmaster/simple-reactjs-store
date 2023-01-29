/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSimpleState } from 'simple-reactjs-store';
import { bookSlice, createBook } from '../store/slices/book';
import { categorySlice, getCategories } from '../store/slices/category';

const initialStateForm = {
  name: '',
  image: '',
  category: '',
};

const BookForm = () => {
  const categoryState = useSimpleState(categorySlice);
  const { categories, isLoading } = categoryState.data;

  const bookState = useSimpleState(bookSlice);
  const { isCreating } = bookState.data;

  const [formData, setFormData] = useState(initialStateForm);

  const handleChage = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await bookState.exec(createBook, formData);
    setFormData(initialStateForm);
  };

  useEffect(() => {
    categoryState.exec(getCategories);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="font-bold text-2xl mb-2 text-gray-700 text-center">Create Book</h2>
      <form onSubmit={handleSubmit} className="text-xl flex flex-col gap-3">
        <div className="flex gap-3 items-center justify-center">
          <b>Category:</b>
          <select
            disabled={isCreating}
            className="w-full bg-white border-2 border-gray-300 p-1 rounded-lg"
            name="category"
            onChange={handleChage}
            value={formData.category}
          >
            <option value="">{isLoading ? 'Loading...' : 'Select category'}</option>

            {categories.length !== 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          <div>
            <button type="button" className="h-12 w-12 bg-blue-500 text-white font-bold text-2xl rounded-full">
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 items-center justify-center">
          <b>Name:</b>
          <input
            disabled={isCreating}
            className="border-2 border-gray-300 p-1 rounded-lg"
            type="text"
            placeholder="Product name"
            name="name"
            onChange={handleChage}
            value={formData.name}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 items-center justify-center">
          <b>Image:</b>
          <input
            disabled={isCreating}
            className="border-2 border-gray-300 p-1 rounded-lg"
            type="text"
            placeholder="Url image"
            name="image"
            onChange={handleChage}
            value={formData.image}
          />
        </div>
        <button disabled={isCreating} className="bg-indigo-500 text-white font-bold text-ms rounded-lg w-full py-2">
          {isCreating ? 'adding book...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
