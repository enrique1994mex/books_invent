import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar'; 
import Header from './Header';

export default function Layout({ children }) {

    //routing 
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Inventario de libros</title>
            </Head>
            <div className=''>
                <ul className='bg-green-900 h-16 flex items-center'>
                    <li className='grow'><NextLink href='/'><a className='text-white bg-teal-500 cursor-pointer rounded inline-block mx-2 p-1 text-lg hover:bg-teal-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg></a>
                    </NextLink>
                    </li>
                    
                </ul>
            </div>
            {
                router.pathname === '/login' || router.pathname === '/register' ? (
                    <div className="bg-teal-500 min-h-screen flex flex-col justify-center">
                        <div>
                            {children}
                        </div>
                    </div>
                ) : (
                    <div className="bg-teal-100 min-h-screen">
                        <div className="sm:flex min-h-screen">
                            <Sidebar/>
                            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                                <Header/>
                                {children}
                            </main>
                        </div>
                    </div>
                )
            }
            <footer>
                <h3 className='text-center'>Todos los derechos reservados</h3>
            </footer>
        </div>
    )
}