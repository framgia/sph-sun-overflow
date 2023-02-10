import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../../organisms/Navbar'
import { LeftSideBar, RightSideBar } from '../../organisms/Sidebar'
import ProvidersWrapper from '../ProvidersWrapper'
import { ToastContainer } from 'react-toastify'
type LayoutProps = {
    children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter()
    const hideRightSidebarInPages = ['/questions/[slug]', '/questions/add']

    const routeIfLoginPathCheck = router.asPath === '/login' || router.asPath === '/login/check'
    return (
        <ProvidersWrapper>
            <main className="relative">
                {!routeIfLoginPathCheck && (
                    <div className="absolute z-50 w-full drop-shadow-md">
                        <Navbar />
                    </div>
                )}
                <div className="flex w-full flex-row">
                    {!routeIfLoginPathCheck && (
                        <div className="flex min-h-screen w-96">
                            <LeftSideBar />
                        </div>
                    )}
                    <div className="flex w-full pt-14">{children}</div>
                    {!routeIfLoginPathCheck &&
                        !hideRightSidebarInPages.includes(router.pathname) && (
                            <div className="w-96">Right side</div>
                        )}
                </div>
                {!routeIfLoginPathCheck && (
                    <div className="fixed -right-16 -bottom-20 -z-50 aspect-square h-[90vh] opacity-10">
                        <Image src="/images/sun_logo.png" alt="sun-logo" fill />
                    </div>
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
        </ProvidersWrapper>
    )
}

export default Layout
