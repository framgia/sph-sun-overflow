import Image from 'next/image'
import { useRouter } from 'next/router'
import Navbar from '../../organisms/Navbar'
import Sidebar from '../../organisms/Sidebar'
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
                            <Sidebar />
                        </div>
                    )}
                    <div className="h-full w-full">{children}</div>
                </div>
                {!routeIfLoginPathCheck && (
                    <div className="fixed -right-16 -bottom-20 -z-50 aspect-square h-[90vh] opacity-10">
                        <Image src="/images/sun_logo.png" alt="sun-logo" fill />
                    </div>
                )}
            </main>
        </ProvidersWrapper>
    )
}

export default Layout
