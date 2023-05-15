import Button from '@/components/atoms/Button'
import { CustomIcons } from '@/components/atoms/Icons'
import LoginCard from '@/components/organisms/LoginCard'
import { errorNotify } from '@/helpers/toast'
import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
const { LoadingSpinner } = CustomIcons

const Login: NextPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    if (router.query.unauthorized === 'true') errorNotify('You are not authorized to login')

    return (
        <>
            <Head>
                <title>Login Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="grid h-full w-full place-items-center">
                <LoginCard>
                    <div className="flex h-full flex-col justify-center gap-5">
                        <div className="text-center text-[32px] font-semibold leading-[117%] tracking-widest text-neutral-900">
                            LOGIN
                        </div>
                        <Button
                            usage="login"
                            onClick={async () => {
                                setLoading(true)
                                await signIn('google', {
                                    callbackUrl: '/login/check',
                                })
                            }}
                            isDisabled={loading}
                            additionalClass={`${loading ? 'pointer-events-none' : ''} `}
                        >
                            {loading ? (
                                <LoadingSpinner additionalClass="flex justify-center" />
                            ) : (
                                'Sign in with Google'
                            )}
                        </Button>
                    </div>
                </LoginCard>
            </div>
        </>
    )
}

export default Login
