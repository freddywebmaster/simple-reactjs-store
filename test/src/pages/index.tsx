import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import Title from '../components/Title';

export default function Home() {
  return (
    <div className="bg-indigo-500 min-h-screen px-4">
      <Title />

      <div className="flex flex-col lg:flex-row justify-center gap-8">
        {/* <BookForm />
        <BookList /> */}
      </div>
    </div>
  );
}
