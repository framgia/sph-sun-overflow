import { useState, useEffect } from 'react'
import Link from 'next/link'
import StackedUsers from '@/components/molecules/StackedUsers'

interface ITeam {
    id: number
    name: string
    members: {
        user: { avatar: string }
    }[]
}
interface TeamSidebarProps {
    loading: boolean
    data: {
        me: {
            teams: {
                team: ITeam
            }[]
        }
    }
}

interface TeamTabProps {
    team: ITeam
}

const TeamSidebar = ({ data, loading = true }: TeamSidebarProps) => {
    const [teams, setTeams] = useState<ITeam[]>([])

    const extractTeams = (): ITeam[] => {
        let teamsList = Array.from(
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
            <div className="tags flex flex-wrap rounded-br-md rounded-bl-md bg-white">
                {teams.length == 0 && (
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

const TeamTab = ({ team }: TeamTabProps) => {
    const extractImageUrls = (): string[] => {
        let imageList = Array.from(
            team.members.map((userWrapper) => {
                let { user } = userWrapper
                if (user.avatar == null || user.avatar == undefined) {
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
                className="flex h-20 w-full items-center justify-between border-b-2 border-b-secondary-gray bg-white px-2 last:rounded-br-md last:rounded-bl-md last:border-b-0 hover:bg-[#E8E8E8]"
                href={`/teams/${team.id}`}
            >
                <div className="ml-2 flex flex-col overflow-hidden align-middle">
                    <div className="w-24 overflow-hidden text-ellipsis text-xl ">{team.name}</div>
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
