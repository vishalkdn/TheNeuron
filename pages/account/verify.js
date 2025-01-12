import Head from "next/head";
import Router from "next/router"
import { useEffect } from 'react'
import { userSession } from "../../lib/user-session";
import { motion } from "framer-motion";
import { pageTransition, pageZoom } from "../../util";

function verify({ verified }) {
    const session = userSession();
    useEffect(() => {
        if (session) {
            Router.push('/')
        }
    }, [session])

    return (
        <>
            <Head>
                <title>The Neuron | Verify</title>
            </Head>
            <div className="py-10">
                <motion.div initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageZoom}
                    transition={pageTransition} className="max-w-lg blur-black py-10 px-5 mx-auto text-center gradient-shadow-md">
                    {verified ?
                        <>
                            <h1 className="text-3xl font-bold text-gray-100">Your account is Verified</h1>
                            <button onClick={() => Router.push('/account/login')} className="inline-block px-6 py-2 text-lg text-white font-semibold rounded-md my-4 btn-blue active:scale-95 transition-sm">Login</button>
                        </>
                        :
                        <h1 className="text-3xl font-bold text-blue-500">Please verify your account first</h1>
                    }
                </motion.div>
            </div>
        </>
    )
}

export default verify

export async function getServerSideProps(context) {
    let verified = false;
    const res = await fetch(`${process.env.HOST}/api/account/verify?token=${context.query.token}`)
    if (res.status === 200) {
        verified = true
    }
    return {
        props: {
            verified
        }
    }
}
