import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from '../../organisms/Navbar';
import Sidebar from '../../organisms/Sidebar';
import ProvidersWrapper from '../ProvidersWrapper';

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  const routeIfLoginPathCheck =
    router.asPath === '/login' || router.asPath === '/login/check';
  return (
    <ProvidersWrapper>
      <main>
        {!routeIfLoginPathCheck && (
          <div className='w-full drop-shadow-md relative z-50'>
            <Navbar />
          </div>
        )}
        <div className='w-full h-screen flex flex-row'>
          {!routeIfLoginPathCheck && (
            <div className='w-96 h-full'>
              <Sidebar />
            </div>
          )}
          <div className='w-full h-full'>{children}</div>
        </div>
        {!routeIfLoginPathCheck && (
          <Image
            src='/images/sun_logo.png'
            alt='sun-logo'
            width={650}
            height={650}
            className='-z-50 fixed -right-16 -bottom-20 opacity-10'
          />
        )}
      </main>
    </ProvidersWrapper>
  );
};

export default Layout;
