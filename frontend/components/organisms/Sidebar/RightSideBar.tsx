import { useRouter } from 'next/router'
import WatchedTags from '@/components/molecules/WatchedTags'
import TeamSidebar from '@/components/molecules/TeamSidebar'
import TeamMemberSidebar from '@/components/molecules/TeamMembersSidebar'
import { useQuery } from '@apollo/client'
import { LOAD_SIDEBAR_1, LOAD_SIDEBAR_2, LOAD_SIDEBAR_3 } from '@/helpers/graphql/Sidebar/Queries'
type TRightSidebarProps = {
    usage: string
}

const RightSideBar = ({ usage }: TRightSidebarProps) => {
    if (usage === 'questions') {
        return <Type1 />
    }
    if (usage === 'members') {
        return <Type2 />
    }
    if (usage === 'profile') {
        return <Type3 />
    }
    return <Type3 />
}

const Type1 = () => {
    return (
        <div className="absolute inset-y-0 right-0 hidden  w-1/6  flex-col pt-32 md:flex lg:flex ">
            <WatchedTags />
            <TeamSidebar />
        </div>
    )
}
const Type2 = () => {
    return (
        <div className="absolute inset-y-0 right-0 hidden  w-1/6  flex-col pt-32 md:flex lg:flex ">
            <TeamMemberSidebar />
        </div>
    )
}
const Type3 = () => {
    return (
        <div className="absolute inset-y-0 right-0 hidden  w-1/6  flex-col pt-32 md:flex lg:flex ">
            <WatchedTags />
        </div>
    )
}
export default RightSideBar
