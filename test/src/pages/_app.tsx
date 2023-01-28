import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SimpleRootStore } from 'simple-reactjs-store';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SimpleRootStore store={store}>
      <Component {...pageProps} />
    </SimpleRootStore>
  );
}
