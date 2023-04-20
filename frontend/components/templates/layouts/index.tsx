import Image from 'next/image'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import AdminWrapper from '../AdminWrapper'
import ProvidersWrapper from '../ProvidersWrapper'
import TopLayout from './TopLayout'
import TopLeftLayout from './TopLeftLayout'
import TopLeftRightLayout from './TopLeftRightLayout'
type LayoutProps = {
    children: JSX.Element
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const router = useRouter()
    const errorPageLayout = ['/403', '/404']
    const withRightSidebar: string[] = [
        '/questions',
        '/tags',
        '/questions/tagged/[slug]',
        '/teams',
        '/users',
    ]

    const routeIfLoginPathCheck = router.asPath.includes('login')

    return (
        <ProvidersWrapper>
            <AdminWrapper>
                <main className="relative bg-neutral-100">
                    {routeIfLoginPathCheck ? (
                        <div className="h-screen w-full">{children}</div>
                    ) : errorPageLayout.includes(router.pathname) ? (
                        <TopLayout>{children}</TopLayout>
                    ) : withRightSidebar.includes(router.pathname) ? (
                        <TopLeftRightLayout>{children}</TopLeftRightLayout>
                    ) : (
                        <TopLeftLayout>{children}</TopLeftLayout>
                    )}
                    {!errorPageLayout.includes(router.pathname) && (
                        <Image
                            height="380"
                            width="380"
                            alt="Sun Bear Logo"
                            className="fixed bottom-0 right-0 opacity-20"
                            src="/images/sun_logo.png"
                        />
                    )}
                    <ToastContainer
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </main>
            </AdminWrapper>
        </ProvidersWrapper>
    )
}

export default Layout
