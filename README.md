# Simple React Store

A library to implement global state with contextApi

## React Context DevTool

You can use this extension to see all data of your store

[download](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf)

## Instalation

`npm i simple-reactjs-store`

## Configuration

This library is easy to use a configurate

### 1. Define your first state

- You can create a new file in `src/store/states/product.js` (if you want create a beautiful folder structure)

```js
export const productState = {
  name: 'products', //unique name to state
  initialState: [], //initial state
};
```

- Using Typescript

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

export const productState = {
  name: 'products',
  initialState: [] as Product[],
};
```

### 2. Define your GlobalStore

- create a new file in `src/store/store.js`...
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

  const usingTheStore = () => {
    //to READ data - you need access to key data
    const productOne = products.data[0];

    //to SET tData - this override to state
    products.set([]);

    //iqual to useState - Copy your data then add the new value
    products.set([
      ...products.data,
      { id: 5, title: 'tv', price: 500 }, //here your new Product
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
    </div>
  );
}
```