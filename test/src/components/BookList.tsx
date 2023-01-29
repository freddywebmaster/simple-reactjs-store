import { useEffect } from 'react';
import { useSimpleState } from 'simple-reactjs-store';
import { getProducts, productSlice } from '../store/slices/product';

const BookList = () => {
  const productState = useSimpleState(productSlice);
  const { products, isLoading } = productState.data;

  useEffect(() => {
    productState.exec(getProducts);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2>Book list</h2>

      {isLoading ? (
        <p>cloading products...</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
