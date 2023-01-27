
import Button from '@/components/atoms/Button'
import type { NextPage } from 'next'
import { FcGoogle } from "react-icons/fc";
import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { setUserToken } from '@/helpers/localStorageHelper';
import { SOCIAL_LOGIN } from '@/helpers/graphql/users/Mutations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [ socialLogin ] = useMutation(SOCIAL_LOGIN)

  if(session) {
    socialLogin({ variables: { token: session.accessToken } })
    .then(({ data }) => {
      setUserToken(data.socialLogin.access_token)
      router.push('/')
    })
    .catch(err =>{
      signOut()
    })
  }
  
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
            <Image src="/images/overflow_logo.png" className="login-overflow-logo" alt='sun-overflow' width={686} height={231} />
            <div className='login-google'>
              <Button additionalClass="login-btn" usage="light" onClick={() => signIn('google')}>
                <FcGoogle className='mr-4 text-3xl'/>
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
