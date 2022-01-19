import Layout from "../components/Layout";
import NextLink from 'next/link';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import UserContext from "../context/user";
import Cookies from 'js-cookie';

export default function Login() {

    const { state, dispatch } = useContext(UserContext);
    const { userInfo } = state;

    //routing
    const router = useRouter();

    //mensaje
    const [mensaje, guardarMensaje] = useState(null); 

    useEffect(() => {
        if (userInfo) {
            router.push('/');
        }
    }, [router, userInfo]);

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
            try {
                const { data } = await axios.post('https://apibooksinvent.herokuapp.com/api/users/login', { email, password });
                guardarMensaje('Authenticating...');  
                dispatch({ type: 'USER_LOGIN', payload: data });
                Cookies.set('userInfo', JSON.stringify(data));
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            } catch (error) {
                guardarMensaje(error.response.data.error); 
                setTimeout( () => {
                    guardarMensaje(null);
                }, 3000);
            }
        },
    });

    const mostrarMensaje = () => {
        return(
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