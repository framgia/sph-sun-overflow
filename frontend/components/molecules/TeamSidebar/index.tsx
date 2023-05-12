import StackedUsers from '@/components/molecules/StackedUsers'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ITeam {
    id: number
    name: string
    members: Array<{
        user: {
            first_name: string
            last_name: string
            avatar: string
        }
    }>
    slug: string
}
interface TeamSidebarProps {
    loading: boolean
    data: {
        me: {
            teams: Array<{
                team: ITeam
            }>
        }
    }
}

interface TeamTabProps {
    team: ITeam
}

const TeamSidebar = ({ data, loading = true }: TeamSidebarProps): JSX.Element => {
    const [teams, setTeams] = useState<ITeam[]>([])

    const extractTeams = (): ITeam[] => {
        const teamsList = Array.from(
            data.me.teams.map((teamWrapper) => {
                return teamWrapper.team
            })
        )
        return teamsList
    }
    useEffect(() => {
        if (!loading) {
            setTeams(extractTeams())
        }
    }, [data])

    return (
        <div className="rounded-smd rounded-br-md border border-neutral-200 drop-shadow-xsm">
            <div className="flex h-12 w-full items-center justify-between rounded-t-smd bg-primary-200 p-4 text-neutral-900">
                <div className="h-fit text-sm font-semibold">My Teams</div>
            </div>
            <div
                className={`hide-scrollbar flex max-h-[384px] flex-wrap rounded-b-smd bg-white ${
                    teams.length > 0 ? 'overflow-y-auto' : ''
                }`}
            >
                {teams.length === 0 && (
                    <div className="w-full rounded-b-smd p-4 text-center text-sm font-medium text-neutral-disabled">
                        Not in any teams yet
                    </div>
                )}
                {teams.length > 0 &&
                    teams.map((team, index) => {
                        return <TeamTab team={team} key={index} />
                    })}
            </div>
        </div>
    )
}

const TeamTab = ({ team }: TeamTabProps): JSX.Element => {
    const extractAvatars = (): Array<{
        user: {
            first_name: string
            last_name: string
            avatar: string
        }
    }> => {
        const imageList = Array.from(
            team.members.map((userWrapper) => {
                const { user } = userWrapper
                return {
                    user: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        avatar: user.avatar,
                    },
                }
            })
        )

        return imageList
    }

    if (team !== undefined) {
        extractAvatars()
        return (
            <Link
                className="flex h-[72px] w-full items-center justify-between border-b border-neutral-200 bg-neutral-white px-4 last:rounded-bl-md last:rounded-br-md last:border-b-0 hover:bg-red-50"
                href={`/teams/${team.slug}`}
            >
                <div className="flex flex flex-col overflow-hidden align-middle">
                    <div className="w-36 overflow-hidden text-ellipsis text-sm font-medium text-neutral-900 line-clamp-2">
                        {team.name}
                    </div>
                    <div className="align-center hidden text-xs text-gray-900 md:text-xs lg:flex">
                        {team.members.length} {team.members.length !== 1 ? 'members' : 'member'}
                    </div>
                </div>
                <div className="hidden h-full items-center align-middle xl:flex">
                    <StackedUsers images={extractAvatars()} memberCount={team.members.length} />
                </div>
            </Link>
        )
    }
    return <></>
}
export default TeamSidebar
