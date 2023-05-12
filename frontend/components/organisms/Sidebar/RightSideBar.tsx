import TeamSidebar from '@/components/molecules/TeamSidebar'
import WatchedTags from '@/components/molecules/WatchedTags'
import { QTagsTeamSidebar } from '@/helpers/graphql//queries/sidebar'
import { useBoundStore } from '@/helpers/store'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
type TRightSidebarProps = {
    usage: string
}

const RightSideBar = ({ usage }: TRightSidebarProps): JSX.Element => {
    return <TagsTeamSidebar />
}

const TagsTeamSidebar = (): JSX.Element => {
    const router = useRouter()

    const watchedTags = useBoundStore((state) => state.watchedTags)
    const { data, loading } = useQuery(QTagsTeamSidebar)
    return (
        <div className="flex w-full flex-col gap-4">
            <WatchedTags watchedTags={watchedTags} />
            {!router.asPath.includes('/teams') && <TeamSidebar data={data} loading={loading} />}
        </div>
    )
}

export default RightSideBar
