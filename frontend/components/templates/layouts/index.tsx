import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../organisms/Navbar'
import { LeftSideBar, RightSideBar } from '../../organisms/Sidebar'
import ProvidersWrapper from '../ProvidersWrapper'

type LayoutProps = {
    children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter()
    const hideRightSidebarInPages: string[] = [
        '/questions/[slug]',
        '/questions/add',
        '/users/[slug]',
        '/questions/[slug]/edit',
        '/teams/[slug]/manage',
        '/teams/question/[slug]',
    ]

    const routeIfLoginPathCheck = router.asPath.includes('login')
    return (
        <ProvidersWrapper>
            <main className="relative">
                {!routeIfLoginPathCheck && (
                    <div className="fixed z-20 w-full drop-shadow-md">
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
                        className={`flex min-h-screen ${
                            hideRightSidebarInPages.includes(router.pathname)
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
                            <div className="relative mr-14 w-1/5 pt-20">
                                <div className="fixed w-1/5">
                                    <RightSideBar
                                        usage={
                                            router.pathname.split('/')[1] === 'teams' &&
                                            router.pathname.split('/').length > 2
                                                ? 'team'
                                                : router.pathname.split('/')[1]
                                        }
                                    />
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
