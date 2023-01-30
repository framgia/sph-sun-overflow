import WatchedTags from '@/components/molecules/WatchedTags'
import TeamSidebar from '@/components/molecules/TeamSidebar'
import TeamMemberSidebar from '@/components/molecules/TeamMembersSidebar'
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
        <div className=" hidden w-1/6  flex-col  self-end  pt-32 lg:flex ">
            <WatchedTags />
            <TeamSidebar />
        </div>
    )
}
const Type2 = () => {
    return (
        <div className=" hidden w-1/6  flex-col  self-end  pt-32 lg:flex ">
            <TeamMemberSidebar />
        </div>
    )
}
const Type3 = () => {
    return (
        <div className=" hidden w-1/6  flex-col  self-end pt-32 lg:flex ">
            <WatchedTags />
        </div>
    )
}
export default RightSideBar
