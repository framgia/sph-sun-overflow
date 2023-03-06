import TeamMemberSidebar from '@/components/molecules/TeamMembersSidebar'
import TeamSidebar from '@/components/molecules/TeamSidebar'
import WatchedTags from '@/components/molecules/WatchedTags'
import { QMembersSidebar, QTagsSidebar, QTagsTeamSidebar } from '@/helpers/graphql//queries/sidebar'
import { useQuery } from '@apollo/client'
type TRightSidebarProps = {
    usage: null | 'teams' | 'users' | string
}
const RightSideBar = ({ usage }: TRightSidebarProps) => {
    if (usage === 'team') {
        return <MembersSidebar />
    }
    if (usage === 'users') {
        return <TagsSidebar />
    }
    return <TagsTeamSidebar />
}

const TagsTeamSidebar = () => {
    const { data, loading } = useQuery(QTagsTeamSidebar)
    return (
        <div className="flex w-full flex-col">
            <WatchedTags data={data} loading={loading} />
            <TeamSidebar data={data} loading={loading} />
        </div>
    )
}
const MembersSidebar = () => {
    const { data, loading } = useQuery(QMembersSidebar, {
        variables: {
            teamId: 1,
        },
    })
    return (
        <div className="flex w-full flex-col">
            <TeamMemberSidebar data={data} loading={loading} />
        </div>
    )
}
const TagsSidebar = () => {
    const { data, loading, error } = useQuery(QTagsSidebar)
    return (
        <div className="flex w-full flex-col">
            <WatchedTags data={data} loading={loading} />
        </div>
    )
}
export default RightSideBar
