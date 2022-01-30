import React, { useContext, useEffect } from 'react';
import UserContext from '../context/user/UserContext';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Header () {

    const { userInfo, signOff } = useContext(UserContext);

    //routing
    const router = useRouter();

    if (!userInfo) {
       return () => router.push('/login');
    }

    const { name } = userInfo;

    const cerrarSesion = () => {
        signOff(); 
        Cookies.remove('userInfo');
        router.push('/login');
    }

    return (
        <div className="sm:flex sm:justify-between mb-6">
            <p className="mr-2 mb-5 lg:mb-0">Hola: {name}</p>

            <button
                onClick={() => cerrarSesion()}
                type="button"
                className="bg-teal-500 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md">
                Sign out
            </button>

        </div>
    );

}
