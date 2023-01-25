import { SessionProvider } from "next-auth/react";

type LayoutProps = {
  children: JSX.Element
}

const ProvidersWrapper = ({ children } : LayoutProps) => {
	return (
		  <SessionProvider>
        {children}
      </SessionProvider>
	);
}

export default ProvidersWrapper
