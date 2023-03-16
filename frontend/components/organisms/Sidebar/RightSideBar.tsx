import TeamMemberSidebar from '@/components/molecules/TeamMembersSidebar'
import TeamSidebar from '@/components/molecules/TeamSidebar'
import WatchedTags from '@/components/molecules/WatchedTags'
import { QMembersSidebar, QTagsSidebar, QTagsTeamSidebar } from '@/helpers/graphql//queries/sidebar'
import { useQuery } from '@apollo/client'
type TRightSidebarProps = {
    usage: null | 'teams' | 'users' | string
    slug?: string
}

interface Teamslug {
    slug: string
}

const RightSideBar = ({ usage, slug = '' }: TRightSidebarProps) => {
    if (usage === 'team') {
        return <MembersSidebar slug={slug} />
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
const MembersSidebar = ({ slug }: Teamslug) => {
    const { data, loading } = useQuery(QMembersSidebar, {
        variables: {
            slug: slug,
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
