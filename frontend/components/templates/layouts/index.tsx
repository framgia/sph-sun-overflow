import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../../organisms/Navbar'
import { LeftSideBar } from '../../organisms/Sidebar'
import ProvidersWrapper from '../ProvidersWrapper'

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
                <div className="flex h-screen w-full flex-row">
                    {!routeIfLoginPathCheck && (
                        <div className="h-full w-96">
                            <LeftSideBar />
                        </div>
                    )}
                    <div className="h-full w-full">{children}</div>
                </div>
                {!routeIfLoginPathCheck && (
                    <Image
                        src="/images/sun_logo.png"
                        alt="sun-logo"
                        width={650}
                        height={650}
                        className="fixed -right-16 -bottom-20 -z-50 opacity-10"
                    />
                )}
            </main>
        </ProvidersWrapper>
    )
}

export default Layout
