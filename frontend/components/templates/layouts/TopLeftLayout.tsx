import Navbar from '@/components/organisms/Navbar'
import { LeftSideBar } from '@/components/organisms/Sidebar'

type Props = {
    children: JSX.Element
}

const TopLeftLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className="relative z-10 h-screen">
            <div className="fixed z-10 h-16 w-full">
                <Navbar />
            </div>
            <div className="fixed flex h-full w-full flex-row pt-16">
                <div className="fixed h-full w-full pl-64">
                    <div className="p-4">{children}</div>
                </div>
                <div className="fixed left-0 h-full w-64">
                    <LeftSideBar />
                </div>
            </div>
        </div>
    )
}

export default TopLeftLayout
