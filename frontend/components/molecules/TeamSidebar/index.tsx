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
        <div className="p-1 mx-3 mt-1 drop-shadow-md rounded-br-md rounded-bl-md">
            <div className="flex justify-between p-4 bg-[#E8E8E8] w-full rounded-tr-xl rounded-tl-xl drop-shadow-md">
                <span className="text-xl font-medium">My Teams</span>
            </div>
            <div className="tags flex flex-wrap rounded-br-md rounded-bl-md bg-white">
                {teams.length == 0 && (
                    <div className="text-center text-xl font-medium w-full rounded-br-md rounded-bl-md p-4">
                        Not in Any Teams Yet
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
                className="flex w-full h-20 justify-between hover:bg-[#E8E8E8] bg-white px-2 items-center border-b-2 border-b-secondary-gray last:rounded-br-md last:rounded-bl-md last:border-b-0"
                href={`/teams/${team.id}`}
            >
                <div className="flex flex-col align-middle overflow-hidden ml-2">
                    <div className="text-xl overflow-hidden text-ellipsis w-24 ">{team.name}</div>
                    <div className="text-md hidden md:text-xs lg:flex">
                        {team.members.length} members
                    </div>
                </div>
                <div className="align-middle hidden xl:flex items-center h-full">
                    <StackedUsers images={extractImageUrls()} />
                </div>
            </Link>
        )
    }
    return <></>
}
export default TeamSidebar
