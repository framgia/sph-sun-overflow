import Navbar from '@/components/organisms/Navbar'
import { LeftSideBar, RightSideBar } from '@/components/organisms/Sidebar'

type Props = {
    children: JSX.Element
}

const TopLeftRightLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className="relative h-screen">
            <div className="fixed z-20 h-14 w-full border-b-2 border-neutral-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]">
                <Navbar />
            </div>
            <div className="fixed relative flex h-full w-full flex-row pt-14">
                <div className="fixed h-full w-full pl-64 pr-[272px]">
                    <div className="h-full w-full py-4 pl-4 pr-2.5">{children}</div>
                </div>
                <div className="fixed left-0 h-full w-64 bg-red-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]">
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
