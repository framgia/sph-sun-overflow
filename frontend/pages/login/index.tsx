import Button from '@/components/atoms/Button'
import { errorNotify } from '@/helpers/toast'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FcGoogle } from 'react-icons/fc'

const Login: NextPage = () => {
    const router = useRouter()

    if (router.query.unauthorized === 'true') errorNotify('You are not authorized to login')

    return (
        <>
            <Head>
                <title>Login Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid h-full w-full place-items-center">
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
                                onClick={async () =>
                                    await signIn('google', {
                                        callbackUrl: '/login/check',
                                    })
                                }
                            >
                                <>
                                    <FcGoogle className="mr-4 text-3xl" />
                                    Sign in with Google
                                </>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
