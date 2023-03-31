import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import Navbar from '../../organisms/Navbar'
import { LeftSideBar, RightSideBar } from '../../organisms/Sidebar'
import ProvidersWrapper from '../ProvidersWrapper'
type LayoutProps = {
    children: JSX.Element
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const router = useRouter()
    const hideLeftSideBarInPages = ['/403', '/404']
    const hideRightSidebarInPages: string[] = [
        '/questions/[slug]',
        '/questions/add',
        '/users/[slug]',
        '/questions/[slug]/edit',
        '/teams/[slug]/manage',
        '/teams/[slug]/question/[question-slug]',
        '/teams/[slug]/question/[question-slug]/edit',
        '/manage/teams/[slug]',
        '/manage/teams',
        '/manage/roles',
        '/manage/roles/create',
        '/manage/roles/[slug]/edit',
        '/manage/tags',
        '/manage/users',
        '/manage/users/[slug]',
        '/403',
        '/404',
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
                    {!routeIfLoginPathCheck &&
                        !hideLeftSideBarInPages.includes(router.pathname) && (
                            <div className="relative w-1/6 ">
                                <div className="fixed h-screen w-1/6 pt-20">
                                    <LeftSideBar />
                                </div>
                            </div>
                        )}
                    <div
                        className={`flex h-screen ${
                            hideRightSidebarInPages.includes(router.pathname)
                                ? 'w-5/6 pt-20'
                                : routeIfLoginPathCheck
                                ? 'w-full'
                                : 'w-4/6 pt-20'
                        } ${hideLeftSideBarInPages.includes(router.pathname) ? '!w-full' : ''}`}
                    >
                        <div className="h-full w-full bg-gray-100 p-8">{children}</div>
                    </div>
                    {!routeIfLoginPathCheck &&
                        !hideRightSidebarInPages.includes(router.pathname) && (
                            <div className="w-1/6 bg-gray-100 pt-28">
                                <div className="fixed w-1/6 pr-4">
                                    <RightSideBar
                                        usage={
                                            router.pathname.split('/')[1] === 'teams' &&
                                            router.pathname.split('/').length > 2
                                                ? 'team'
                                                : router.pathname.split('/')[1]
                                        }
                                        slug={router.asPath.split('/')[2]}
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
