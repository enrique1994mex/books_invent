import React from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

export default function Sidebar () {
    // routing de next
    const router = useRouter();

    return (
        <aside className="bg-teal-500 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div>
                <p className="text-white text-2xl font-black">CRM Clientes</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-green-900 p-3" : "p-3"}>
                    <NextLink href="/"><a className="text-white  block">Books</a></NextLink>
                </li>
                <li className={router.pathname === "/pedidos" ? "bg-green-900 p-3" : "p-3"}>
                    <NextLink href="/pedidos"><a className="text-white block">Users</a></NextLink>
                </li>
            </nav>

        </aside>
    )
}
