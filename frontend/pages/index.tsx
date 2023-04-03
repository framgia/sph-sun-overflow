import Head from 'next/head'
import QuestionsPage from './questions'

export default function Home(): JSX.Element {
    return (
        <>
            <Head>
                <title>Sun* Overflow</title>
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
