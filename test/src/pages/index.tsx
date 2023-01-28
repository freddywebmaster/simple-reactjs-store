import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import Title from '../components/Title';

export default function Home() {
  return (
    <div className="bg-indigo-500 min-h-screen">
      <Title />

      <div className='grid lg:grid-cols-2 px-4 py-6'>
        <BookForm />
        <BookList />
      </div>
    </div>
  );
}
