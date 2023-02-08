import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../../organisms/Navbar'
import { LeftSideBar } from '../../organisms/Sidebar'
import ProvidersWrapper from '../ProvidersWrapper'
import { ToastContainer } from 'react-toastify'
type LayoutProps = {
    children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter()

    const routeIfLoginPathCheck = router.asPath === '/login' || router.asPath === '/login/check'
    return (
        <ProvidersWrapper>
            <main>
                {!routeIfLoginPathCheck && (
                    <div className="relative z-50 w-full drop-shadow-md">
                        <Navbar />
                    </div>
                )}
                <div className="flex h-screen h-full w-full flex-row">
                    {!routeIfLoginPathCheck && (
                        <div className="w-96">
                            <LeftSideBar />
                        </div>
                    )}
                    <div className="h-full w-full">{children}</div>
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
