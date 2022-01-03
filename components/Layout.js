import React from 'react'; 
import Head from 'next/head';
import NextLink from 'next/link';  

export default function Layout({title, children}) {

    return(
        <div>
            <Head>
                <title>Inventario de libros</title>
            </Head>
            <div className=''>
                <ul className='bg-green-900 h-16 flex items-center'>
                    <li className='grow'><NextLink href='/'><a className='text-white bg-teal-500 cursor-pointer rounded inline-block mx-2 p-1 text-lg hover:bg-teal-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg></a>
                        </NextLink>
                    </li>
                    <li className=''><NextLink href='/login'><a className='text-white bg-teal-500 cursor-pointer rounded inline-block mx-2 p-1 text-lg hover:bg-teal-600'>Login</a></NextLink></li>
                    <li className=''><NextLink href='/register'><a className='text-white bg-teal-500 cursor-pointer rounded inline-block mx-2 p-1 text-lg hover:bg-teal-600'>Register</a></NextLink></li>
                </ul>
            </div>
            <div>
                {children}
            </div>
            <footer>
                <h3 className='text-center'>Todos los derechos reservados</h3>
            </footer>
        </div>
    )
}