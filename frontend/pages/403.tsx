import PageTitle from '@/components/atoms/PageTitle'
import Link from 'next/link'

const UnauthorizedPage = (): JSX.Element => {
    return (
        <>
            <PageTitle title="403" />
            <section className="flex h-full w-full items-center justify-center">
                <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-red lg:text-9xl">
                            403
                        </h1>
                        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                            Unauthorized
                        </p>
                        <p className="mb-4 text-lg font-light text-gray-500">
                            Sorry, you are not authorized to access this page.
                        </p>
                        <Link
                            href="/questions"
                            className="my-4 inline-flex rounded-lg bg-primary-red px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                        >
                            Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UnauthorizedPage
