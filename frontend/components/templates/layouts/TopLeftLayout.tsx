import Navbar from '@/components/organisms/Navbar'
import { LeftSideBar } from '@/components/organisms/Sidebar'

type Props = {
    children: JSX.Element
}

const TopLeftLayout = ({ children }: Props): JSX.Element => {
    return (
        <div className="relative h-screen">
            <div className="fixed z-20 h-[56px] w-full border-b-2 border-neutral-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]">
                <Navbar />
            </div>
            <div className="fixed flex h-full w-full flex-row pt-[56px]">
                <div className="fixed h-full w-full pl-[256px]">
                    <div className="p-[16px]">{children}</div>
                </div>
                <div className="fixed left-0 h-full w-[256px] bg-red-200 drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]">
                    <LeftSideBar />
                </div>
            </div>
        </div>
    )
}

export default TopLeftLayout
