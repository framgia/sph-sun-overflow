
import Button from '@/components/atoms/Button'
import type { NextPage } from 'next'
import { FcGoogle } from "react-icons/fc";
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
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
              <Button additionalClass="login-btn" usage="light" onClick={() => console.log('login')}>
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
