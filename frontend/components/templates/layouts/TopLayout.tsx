import Navbar from '@/components/organisms/Navbar'

type Props = {
    children: JSX.Element
}

const TopLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className="relative z-10 h-screen">
            <div className="fixed z-20 h-14 w-full border-b-2 border-neutral-200 drop-shadow-xsm">
                <Navbar />
            </div>
            <div className="fixed h-full w-full pt-14">{children}</div>
        </div>
    )
}

export default TopLayout
