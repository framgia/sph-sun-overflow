import Navbar from '@/components/organisms/Navbar'
import { LeftSideBar, RightSideBar } from '@/components/organisms/Sidebar'

type Props = {
    children: JSX.Element
}

const TopLeftRightLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className="relative z-10 h-screen">
            <div className="fixed z-10 h-16 w-full">
                <Navbar />
            </div>
            <div className="fixed relative flex h-full w-full flex-row pt-16">
                <div className="fixed h-full w-full pl-64 pr-[272px]">
                    <div className="h-full w-full py-4 pl-4 pr-2.5">{children}</div>
                </div>
                <div className="fixed left-0 h-full w-64">
                    <LeftSideBar />
                </div>
                <div className="fixed right-0 h-full w-[272px] py-4 pr-4">
                    <RightSideBar usage="" />
                </div>
            </div>
        </div>
    )
}

export default TopLeftRightLayout
