import StackedUsers from '@/components/molecules/StackedUsers'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ITeam {
    id: number
    name: string
    members: Array<{
        user: { avatar: string }
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
        <div className="mx-3 mt-1 rounded-br-md rounded-bl-md p-1 drop-shadow-md">
            <div className="flex w-full justify-between rounded-tr-xl rounded-tl-xl bg-[#E8E8E8] p-4 drop-shadow-md">
                <span className="text-xl font-medium">My Teams</span>
            </div>
            <div
                className={`tags flex max-h-[384px] flex-wrap rounded-br-md rounded-bl-md bg-white ${
                    teams.length > 0 ? 'overflow-y-scroll' : ''
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
    const extractImageUrls = (): string[] => {
        const imageList = Array.from(
            team.members.map((userWrapper) => {
                const { user } = userWrapper
                if (user.avatar === null || user.avatar === undefined) {
                    return 'https://www.w3schools.com/howto/img_avatar.png'
                }
                return user.avatar
            })
        )
        return imageList
    }
    if (team !== undefined) {
        extractImageUrls()
        return (
            <Link
                className="flex h-24 w-full items-center justify-between border-b-2 border-b-secondary-gray bg-white px-2 last:rounded-br-md last:rounded-bl-md last:border-b-0 hover:bg-[#E8E8E8]"
                href={`/teams/${team.slug}`}
            >
                <div className="ml-2 flex flex-col overflow-hidden align-middle">
                    <div className="text-md w-36 overflow-hidden text-ellipsis line-clamp-2 ">
                        {team.name}
                    </div>
                    <div className="text-md hidden md:text-xs lg:flex">
                        {team.members.length} members
                    </div>
                </div>
                <div className="hidden h-full items-center align-middle xl:flex">
                    <StackedUsers images={extractImageUrls()} />
                </div>
            </Link>
        )
    }
    return <></>
}
export default TeamSidebar
