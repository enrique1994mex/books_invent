import Layout from "../components/Layout";
import NextLink from 'next/link'; 

export default function Login() {

    return(
        <Layout>
            <div className="h-full my-auto">
                <h1 className="text-center text-2xl font-semibold">Login</h1>
                <form className="max-w-sm mx-auto bg-slate-100 rounded-md border-2 border-slate-200">
                    <div className="m-4 p-2">
                        <label className="w-full inline-block my-2" for="email">Email</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500" id="email" type="email"></input>
                    </div>
                    <div className="m-4 p-2">
                        <label className="w-full inline-block my-2" for="password">Password</label>
                        <input className="w-full bg-white focus:outline-none rounded-md focus:ring focus:ring-teal-500 focus:border-teal-500" id="password" type="password"></input>
                    </div>
                    <div className="m-4 p-2">
                        <button className="bg-teal-500 w-full text-white rounded-md text-lg py-1" type="submit">Login</button>
                    </div>
                    <div className="m-4 p-2">
                        No tiene una cuenta &nbsp; <NextLink href='/register'><a className="text-blue-600 hover:underline">Registrese</a></NextLink>
                    </div>
                </form>
            </div>
        </Layout>
    )
}