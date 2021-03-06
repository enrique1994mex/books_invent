import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import apiCall from '../api';

export default function NuevoLibro() {

    //notistack
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            lastName: '',
            year: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            author: Yup.string().required('Author is required'),
            lastName: Yup.string().required('Last name is required'),
            year: Yup.number().required('Year is required').positive('The number must be positive').integer('The number must be integer')
        }),
        onSubmit: async values => {
            const { title, author, lastName, year } = values;
            try {
                const response = await apiCall({
                    url: 'https://apibooksinvent.herokuapp.com/api/books',
                    method: 'POST',
                    body: JSON.stringify({ title, author, lastName, year }),
                    headers: { 'Content-Type': 'application/json' },
                })

                if(response.status === 200) {
                    const data = await response.json()
                    enqueueSnackbar(data.Message, { variant: 'success' })
                        setTimeout(() => {
                            closeSnackbar();
                        }, 3000);
                } else if (response.status === 400) {
                    const error = await response.json()
                    enqueueSnackbar(error.error, { variant: 'error' });
                        setTimeout(() => {
                            closeSnackbar();
                        }, 3000);
                }
            } catch (error) {
                console.log(error)
            }
        },
    });

    return (
        <Layout>
            <div className="h-full my-auto">
                <h1 className="text-left text-2xl font-semibold">New book</h1>
                <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto bg-slate-100 rounded-md border-2 border-slate-200">
                    <div className="m-4 p-2">
                        <label className="w-full inline-block my-2" htmlFor="title">Title of the book</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                            id="title"
                            name="title"
                            type="text"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                        </input>
                    </div>

                    <div className="m-4 p-2">
                        <label className="w-full inline-block my-2" htmlFor="author">Autho&#39;s name</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                            id="author"
                            name="author"
                            type="text"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                        </input>
                    </div>

                    <div className="m-4 p-2">
                        <label className="w-full inline-block my-2" htmlFor="lastName">Autho&#39;s last name</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                        </input>
                    </div>

                    <div className="m-4 p-2">
                        <label className="w-full inline-block my-2" htmlFor="year">Year</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500"
                            id="year"
                            name="year"
                            type="number"
                            value={formik.values.year}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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