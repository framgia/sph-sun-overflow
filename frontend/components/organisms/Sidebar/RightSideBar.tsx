import WatchedTags from '@/components/molecules/WatchedTags'
import TeamSidebar from '@/components/molecules/TeamSidebar'
import TeamMemberSidebar from '@/components/molecules/TeamMembersSidebar'
import { LOAD_SIDEBAR_1, LOAD_SIDEBAR_2, LOAD_SIDEBAR_3 } from '@/helpers/graphql//queries/sidebar'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
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
    const { data, loading } = useQuery(LOAD_SIDEBAR_1)
    return (
        <div className=" self-end w-1/5  pt-4  hidden  lg:flex flex-col mr-6 ">
            <WatchedTags data={data} loading={loading} />
            <TeamSidebar data={data} loading={loading} />
        </div>
    )
}
const Type2 = () => {
    const router = useRouter()
    const { data, loading } = useQuery(LOAD_SIDEBAR_2, {
        variables: {
            teamId: router.query.teamId,
        },
    })
    return (
        <div className=" self-end w-1/5  pt-4  hidden  lg:flex flex-col mr-6">
            <TeamMemberSidebar data={data} loading={loading} />
        </div>
    )
}
const Type3 = () => {
    const { data, loading, error } = useQuery(LOAD_SIDEBAR_3, {
        variables: { userId: 1 },
    })
    return (
        <div className=" self-end w-1/5 pt-4  hidden lg:flex flex-col mr-6">
            <WatchedTags data={data} loading={loading} />
        </div>
    )
}
export default RightSideBar
