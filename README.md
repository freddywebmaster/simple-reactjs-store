# Simple React Store

A library to implement global state with contextApi.

## Instalation

`npm i simple-reactjs-store`

## React Context DevTool

You can use this extension to see all data of your store

[Download](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf)

## Configuration

This library is easy to use a configurate

### 1. Define your first state

- You can create a new file in `store/states/product.js` (if you want create a beautiful folder structure)

```js
import { createSlice } from 'simple-reactjs-store';

export const productState = createSlice({
  name: 'products', //unique name to state
  initialState: [], //initial state
});
```

- Using Typescript

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

export const productState = createSlice({
  name: 'products',
  initialState: [] as Product[],
});
```

### 2. Define your GlobalStore

- create a new file in `store/store.js`...
- the only thing you have to do is put all the states in an array and export it

```js
import { productState } from 'store/states/product';

export const store = [productState];
```

### 3. Add `Context` to all app

```jsx
import { store } from 'store/store';
import { SimpleRootStore } from 'simple-reactjs-store';

export default function App({ Component, pageProps }) {
  return (
    //you need pass your root states, and this component provide access to all data
    <SimpleRootStore store={store}>
      <Component {...pageProps} />
    </SimpleRootStore>
  );
}
```

## Usage

To start using your state, you just have to import the hook `useSimpleState` and pass it the state you want to use.

```jsx
import { useEffect } from 'react';
import { productState } from 'store/states/product';
import { useSimpleState } from 'simple-reactjs-store';

export function Home() {
  const products = useSimpleState(productState); //hook to pass your state

  const addProduct = () => {
    //iqual to useState - Copy your data then add the new value
    products.set([
      ...products.data,
      { id: 5, title: 'tv', price: 500 }, //here your new value
    ]);
  };

  return (
    <div>
      {products.data.length !== 0 &&
        products.data.map((product) => (
          <div>
            <p key={product.id}>{product.title}</p>
          </div>
        ))}
      <button onClick={addProduct}>add product</button>
    </div>
  );
}
```

## Full Example of `slice` with `typescript`

```jsx
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
    //you can recive 3 params in fn => state, setState, payload(optionaly)
    //you need return a state
    // ASYNC CODE IS COMPATIBLE
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

//export the actions from your slice
export const { getCategories } = categorySlice.actions;
```

## Using Actions of slice

- Import an action to use and pass to your `state.exec`

```jsx
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

    //If you need pass a payload to Action, set in second parameter of exec
    categoryState.exec(getCategories, 'Your payload here :)');
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
```
