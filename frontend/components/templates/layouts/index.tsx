import { useRouter } from 'next/router';
import Navbar from '../../organisms/Navbar';
import Sidebar from '../../organisms/Sidebar';
import ProvidersWrapper from '../ProvidersWrapper';

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children } : LayoutProps) => {
  const router = useRouter();

  const routeIfLoginPathCheck = router.asPath === "/login" || router.asPath === "/login/check"
	return (
    <ProvidersWrapper>
      {!routeIfLoginPathCheck && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <main>{children}</main>
    </ProvidersWrapper>
	);
}

export default Layout
