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
    const hideRightSidebarInPages: string[] = ['/questions/[slug]', '/questions/add']

    const routeIfLoginPathCheck = router.asPath === '/login' || router.asPath === '/login/check'
    return (
        <ProvidersWrapper>
            <main className="relative">
                {!routeIfLoginPathCheck && (
                    <div className="fixed z-50 w-full drop-shadow-md">
                        <Navbar />
                    </div>
                )}
                <div className="flex w-full flex-row">
                    {!routeIfLoginPathCheck && (
                        <div className="relative w-1/5 ">
                            <div className="fixed h-screen w-1/5">
                                <LeftSideBar />
                            </div>
                        </div>
                    )}
                    <div
                        className={`flex min-h-screen ${hideRightSidebarInPages.includes(router.pathname)
                            ? 'w-4/5 pt-14'
                            : routeIfLoginPathCheck
                                ? 'w-full'
                                : 'w-3/5 pt-14'
                            }`}
                    >
                        {children}
                    </div>
                    {!routeIfLoginPathCheck &&
                        !hideRightSidebarInPages.includes(router.pathname) && (
                            <div className="relative mr-6 w-1/5 pt-20">
                                <div className="fixed w-1/5">
                                    <RightSideBar usage={router.pathname.split('/')[1]} />
                                </div>
                            </div>
                        )}
                </div>
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
