import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { SimpleRootStore } from 'simple-reactjs-store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SimpleRootStore store={store}>
      <Component {...pageProps} />
    </SimpleRootStore>
  );
}
