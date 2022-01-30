import Layout from "../components/Layout";
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import UserContext from "../context/user/UserContext";
import Cookies from 'js-cookie';

export default function Login() {

    const { userInfo, getUser, errorMessage } = useContext(UserContext);

    //routing
    const router = useRouter();

    //mensaje
    const [mensaje, guardarMensaje] = useState(null);

    useEffect(() => {
        if (userInfo) {
            guardarMensaje('Authenticating');
            Cookies.set('userInfo', JSON.stringify(userInfo));
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else if (errorMessage) {
            guardarMensaje(errorMessage.error)
            setTimeout(() => {
                guardarMensaje(null);
            }, 2000);
        }
    }, [router, userInfo, errorMessage]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('El email no es válido').required('El email no puede ir vacío'),
            password: Yup.string().required('El password es obligatorio')
        }),
        onSubmit: async values => {
            const { email, password } = values;
            await getUser(email, password)
        },
    });

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

    return (
        <Layout>
            <h1 className="text-center text-2xl font-semibold">Login</h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="bg-slate-100 rounded-md border-2 border-slate-200">
                        <div className="m-4 p-2">
                            <label className="w-full inline-block my-2" htmlFor="email">Email</label>
                            <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            >
                            </input>
                        </div>

                        <div className="m-4 p-2">
                            <label className="w-full inline-block my-2" htmlFor="password">Password</label>
                            <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            >
                            </input>
                        </div>

                        <div className="m-4 p-2">
                            <button className="bg-teal-500 w-full text-white rounded-md text-lg py-1" type="submit">Login</button>
                        </div>

                        <div className="m-4 p-2">
                            You don&#39;t have an account &nbsp; <NextLink href='/register'><a className="text-blue-600 hover:underline">Register</a></NextLink>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}