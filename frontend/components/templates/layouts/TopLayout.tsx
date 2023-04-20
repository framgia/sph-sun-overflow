import Navbar from '@/components/organisms/Navbar'

type Props = {
    children: JSX.Element
}

const TopLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className="relative z-10 h-screen">
            <div className="fixed z-10 h-16 w-full">
                <Navbar />
            </div>
            <div className="fixed h-full w-full pt-16">{children}</div>
        </div>
    )
}

export default TopLayout
