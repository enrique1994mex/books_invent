import Layout from "../components/Layout";
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user/index';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import axios from 'axios'; 
import Book from "../components/Book";

export default function Home(props) {

  //Context
  const { state, dispatch } = useContext(UserContext);
  const { userInfo } = state;

  //Data fetch
  const [books, setBooks] = useState([]);

  //routing
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  },[userInfo, router])

  useEffect(() => {
    //Llamada a la B.D para mostrar los libros
    const {books} = props; 
    return setBooks(books)
  }, [props]);
  
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Books</h1>
        <NextLink href="/nuevoLibro">
          <a className="bg-green-900 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">New Book</a>
        </NextLink>
        
        <div>
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-teal-500">
              <tr className="text-white">
                <th className="w-1/5 py-2">Title</th>
                <th className="w-1/5 py-2">Author name</th>
                <th className="w-1/5 py-2">Last name author</th>
                <th className="w-1/5 py-2">Year</th>
              </tr>
            </thead>
            <tbody className="bg-white">
             {
             books.map(book => (
               <Book key={book.IdLibro} book={book}/>
             ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  const {data} = await axios.get('https://apibooksinvent.herokuapp.com/api/books'); 
  const books = data.map(book => ({...book})); 
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {books}
  }
}

