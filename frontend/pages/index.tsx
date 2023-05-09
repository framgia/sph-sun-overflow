import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import QuestionsPage from './questions'

export default function Home(): JSX.Element {
    const { push } = useRouter()

    useEffect(() => {
        void push('/questions')
    }, [])

    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="SunOverflow is an internal project for the employees of Sun Asterisk PH that aims to help the team with asking and answering questions."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <QuestionsPage />
            </main>
        </>
    )
}
