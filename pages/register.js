import Layout from "../components/Layout";
import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import UserContext from "../context/user/UserContext";
import Cookies from "js-cookie";

export default function Register() {

    //Context
    const { userInfo, setUser, errorMessage } = useContext(UserContext);

    //routing
    const router = useRouter();

    //mensaje
    const [mensaje, guardarMensaje] = useState(null);

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo)
            guardarMensaje("User saved successfully");
            Cookies.set('userInfo', JSON.stringify(userInfo));
            setTimeout(() => {
                router.push('/'); 
            }, 2000);
        } else if (errorMessage) {
            console.log(errorMessage)
            guardarMensaje(errorMessage.error)
            setTimeout(() => {
                guardarMensaje(null);
            }, 2000);
        }
    }, [router, userInfo, errorMessage]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El Nombre es Obligatorio'),
            email: Yup.string().email('El email no es válido').required('El email no puede ir vacío'),
            password: Yup.string().required('El password es obligatorio'),
            confirmPassword: Yup.string().required('El password es obligatorio')
        }),
        onSubmit: async values => {
            const { name, email, password, confirmPassword } = values;
            if (password !== confirmPassword) {
                guardarMensaje("Passwords don't match");
                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            } else {
                await setUser(name, email, password)
            }
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
            <div className="h-full my-auto">
                <h1 className="text-center text-2xl font-semibold">Register</h1>
                {mensaje && mostrarMensaje()}
                <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto bg-slate-100 rounded-md border-2 border-slate-200">
                    <div className="m-4 p-2">
                        <label className="w-full inline-block my-2" htmlFor="name">Name</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        >
                        </input>
                    </div>

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
                        <label className="w-full inline-block my-2" htmlFor="confirmPassword">Confirm password</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                        >
                        </input>
                    </div>

                    <div className="m-4 p-2">
                        <button className="bg-teal-500 w-full text-white rounded-md text-lg py-1" type="submit">Register</button>
                    </div>

                </form>
            </div>
        </Layout>
    )
}