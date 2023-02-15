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
    if (usage === 'teams') {
        return <Type2 />
    }
    if (usage === 'users') {
        return <Type3 />
    }
    return <Type1 />
}

const Type1 = () => {
    const { data, loading } = useQuery(LOAD_SIDEBAR_1)
    return (
        <div className="flex w-full flex-col">
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
        <div className="flex w-full flex-col">
            <TeamMemberSidebar data={data} loading={loading} />
        </div>
    )
}
const Type3 = () => {
    const { data, loading, error } = useQuery(LOAD_SIDEBAR_3, {
        variables: { userId: 1 },
    })
    return (
        <div className="flex w-full flex-col">
            <WatchedTags data={data} loading={loading} />
        </div>
    )
}
export default RightSideBar
