# Simple React Store

- A library to implement global state in react.

- In `v0.0.18` of this library... `rxjs` has been implemented instead of `contextApi`, but you can still use the `React Context DevTool` as normal :)

-Cache in `localstorage` implemented

## Old Documentations

- [0.0.1 to 0.0.17](./oldDocs/0.0.17.md)

## Why?

On many occasions you have small project ideas, I have implemented a `contextApi` architecture, Redux, Zuztand, Etc, it takes a long time sometimes, `Recoil` is a solution but from my point of view I have had many problems using it...

## Instalation

`npm i simple-reactjs-store`

## React Context DevTool

You can use this extension to see all data of your store

- [Download Extention](https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf)

## Configuration

This library it's easy to configurate :)

### 1. Define your first store

- You can create a new file in `store/users.js` (if you want create a beautiful folder structure)

```js
import { CreateSlice } from 'simple-reactjs-store';

export const userSlice = CreateSlice({
  name: 'users',
  initialState: [],
  reducer(state, action) {
    //your actions
    switch (action.type) {
      case 'ADD_USER':
        return [...state, action.payload];
      default:
        return state;
    }
  },
});
```

### Using Typescript

```ts
import { CreateSlice } from 'simple-reactjs-store';

export interface User {
  name: string;
  email: string;
  age: number;
}

export const userSlice = CreateSlice({
  name: 'users',
  initialState: [] as User[],
  reducer(state, action) {
    switch (action.type) {
      case 'ADD_USER':
        return [...state, action.payload];
      default:
        return state;
    }
  },
});
```

## Full Example of `slice` with `typescript`

- Cache in localstorage is `Experimental`.

```jsx
import { CreateSlice } from "simple-reactjs-store";

export interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
}

//The best practice is create a constants for your actions but you are free to do what you want
export const PRODUCT_ACTIONS = {
  ADD_PRODUCT: "ADD_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
};

export const productStore = CreateSlice({
  name: "products",
  initialState: [] as Product[], //you can define the state you want
  config: { useLocalStorageCache: true }, //CACHE STORAGE (EXPERIMENTAL)
  reducer(state, action) {
    switch (action.type) {
      case PRODUCT_ACTIONS.ADD_PRODUCT:
        return [...state, action.payload];
      case PRODUCT_ACTIONS.DELETE_PRODUCT:
        return state.filter((product) => product.name !== action.payload);
      default:
        return state;
    }
  },
});
```

### 2. Define a `GlobalProvider` in your App.js

The store props receive an `Array` of `Slices`

```jsx
import { SimpleStateProvider } from 'simple-reactjs-store';
import { productState } from 'store/product';
import { userState } from 'store/user';

export default function App({ Component, pageProps }) {
  return (
    <SimpleStateProvider store={[productState, userState]}>
      <Component {...pageProps} />
    </SimpleStateProvider>
  );
}
```

## Store management

To start using your state, you just have to import the hook `useSimpleStore` and pass it the state you want to use.

```jsx
const { data, dispatch, asyncDispatch } = useSimpleStore(productStore);
```

- You can use `data` to access to all data of store

```jsx
console.log(data);

data.map((product, i) => (
  <div key={i}>
    <p>{product.name}</p>
  </div>
));
```

- You can use `select` to suscribe a value of store
- I recomend subscribe in `useEffect`

```jsx
//suscribe to value
const mySubscription = select('isLoading').subscribe((value) => {
  console.log(`value isLoading change to ${value}`);
});

//unsuscribe
mySubscription.unsubscribe();
```

- You can use `dispatch` to execute acction and pass a payload;

```jsx
dispatch({
  type: 'ADD_PRODUCT', //Type of your action definition in slice
  payload: {
    name: 'TV Smart',
    description: 'This product will be saved in store',
  },
});
```

- You can use `asyncDispatch` to promises

```jsx
await asyncDispatch(CATEGORY_ACTIONS.SET_CATEGORIES, getCategories);
```

- If you want set a loader in your promise...

```jsx
const loadCategories = async () => {
  //you can use your store or useState... this is only example
  dispatch({ type: CATEGORY_ACTIONS.SET_ISLOADING, payload: true });
  //the promise need return the payload
  await asyncDispatch(CATEGORY_ACTIONS.SET_CATEGORIES, getCategories);

  dispatch({ type: CATEGORY_ACTIONS.SET_ISLOADING, payload: false });
};
```

## Basic Full Example

```jsx
import { useSimpleStore } from 'simple-reactjs-store';
import { productStore } from '../stores/product';

const ProductList = () => {
  const { data, dispatch } = useSimpleStore(productStore);

  const addProduct = () => {
    dispatch({
      type: 'ADD_PRODUCT', //Type of your action definition in slice
      payload: {
        name: 'TV Smart',
        description: 'This product will be saved in store',
      },
    });
  };

  return (
    <div>
      <button onClick={addProduct}>Click to add product</button>

      {/* accesing to data */}
      {data.length === 0 ? (
        <p>no products avalible</p>
      ) : (
        data.map((product, i) => (
          <div key={i}>
            <p>{product.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
```

# Custom Use - (Another way to use)

make use of as follows if you don't want to use cache on localStorage and also don't want to use ContextDevTools

- `why should` i do it like this?
  In this way we have more flexibility and management of the state

`advantages`

1. own hooks
2. full state control
3. dont need use `GlobalProvider` of this library
4. you can manage subscriptions as you like

- `disadvantages`

1. local storage cache not found you need set manualy
2. Context devTools not work
3. you spend more time

```jsx
import { mySlice } from 'store/mySlice';

const { store, slice } = mySlice;

const [myState, setMyState] = useState(slice.initialstate);

//dispatching to store
const saveNewValue = store.dispatch({ type: 'ADD', payload: 'Hello world' });

useEffect(() => {
  //suscription to store
  const subs = store.subscribe((data) => {
    setMyState(data);
  });

  //unsubscribe when the component unmount
  return () => subs.unsubscribe();
}, []);
```
