import Navbar from '../../organisms/Navbar';
import Sidebar from '../../organisms/Sidebar';

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children } : LayoutProps) => {
	return (
		<>
      <Navbar />
      <Sidebar />
      <main>{children}</main>
    </>
	);
}

export default Layout
