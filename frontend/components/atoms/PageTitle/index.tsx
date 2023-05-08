import Head from 'next/head'

type PageTitleProps = {
    title?: string
}

const PageTitle = ({ title }: PageTitleProps): JSX.Element => {
    return (
        <Head>
            <title>{title ? `${title} - Sun Overflow` : 'Sun Overflow'}</title>
        </Head>
    )
}

export default PageTitle
