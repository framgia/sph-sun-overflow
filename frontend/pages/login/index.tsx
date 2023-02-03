import Button from '@/components/atoms/Button'
import type { NextPage } from 'next'
import { FcGoogle } from 'react-icons/fc'
import Head from 'next/head'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Login Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid h-screen place-items-center">
                <div>
                    <p className="login-welcome">Welcome !</p>
                    <div className="login-card">
                        <Image
                            src="/images/overflow_logo.png"
                            className="login-overflow-logo"
                            alt="sun-overflow"
                            width={686}
                            height={231}
                        />
                        <div className="login-google">
                            <Button
                                additionalClass="login-btn"
                                usage="light"
                                onClick={() =>
                                    signIn('google', {
                                        callbackUrl: 'http://localhost:3000/login/check',
                                    })
                                }
                            >
                                <FcGoogle className="mr-4 text-3xl" />
                                Sign in with Google
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
