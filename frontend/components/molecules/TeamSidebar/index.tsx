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
        <div className="mt-4 rounded-br-md rounded-bl-md  drop-shadow-md">
            <div className="flex w-full justify-between rounded-tr-md rounded-tl-md bg-primary-200 p-2.5 text-white drop-shadow-md">
                <span className="text-md">My Teams</span>
            </div>
            <div
                className={`hide-scrollbar flex max-h-[384px] flex-wrap rounded-br-md rounded-bl-md bg-white ${
                    teams.length > 0 ? 'overflow-y-auto' : ''
                }`}
            >
                {teams.length === 0 && (
                    <div className="text-md w-full rounded-br-md rounded-bl-md p-4 text-center font-medium">
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
                className="flex h-20 w-full items-center justify-between border-b-2 border-b-secondary-gray bg-neutral-white px-2 last:rounded-br-md last:rounded-bl-md last:border-b-0 hover:bg-red-50"
                href={`/teams/${team.slug}`}
            >
                <div className="ml-2 flex flex-col overflow-hidden align-middle">
                    <div className="w-36 overflow-hidden text-ellipsis text-sm text-gray-800 line-clamp-2">
                        {team.name}
                    </div>
                    <div className="text-md align-center hidden text-gray-600 md:text-sm lg:flex">
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
