import Navbar from '@/components/organisms/Navbar'

type Props = {
    children: JSX.Element
}

const TopLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className="relative h-screen">
            <div className="fixed z-20 h-14 w-full border-b-2 border-neutral-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]">
                <Navbar />
            </div>
            <div className="fixed h-full w-full pt-14">{children}</div>
        </div>
    )
}

export default TopLayout
