import { SessionProvider } from 'next-auth/react'

type LayoutProps = {
    children: JSX.Element
}

const ProvidersWrapper = ({ children }: LayoutProps): JSX.Element => {
    return <SessionProvider>{children}</SessionProvider>
}

export default ProvidersWrapper
