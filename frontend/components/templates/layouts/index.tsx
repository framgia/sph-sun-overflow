import { useRouter } from 'next/router';
import Navbar from '../../organisms/Navbar';
import Sidebar from '../../organisms/Sidebar';

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children } : LayoutProps) => {
  const router = useRouter();

	return (
		<>
      {router.pathname !== "/login" && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <main>{children}</main>
    </>
	);
}

export default Layout
