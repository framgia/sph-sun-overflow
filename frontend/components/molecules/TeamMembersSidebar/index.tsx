import { useEffect, useState } from 'react'
import UserTab from '../UserTab'
interface IUser {
    id: number
    first_name: string
    last_name: string
    avatar: string
    reputation: number
    role: string
}

interface MembersSidebarProps {
    loading: boolean
    data: {
        team: {
            members: {
                teamRole: { name: string }
                user: IUser
            }[]
        }
    }
}

const TeamMemberSidebar = ({ data, loading }: MembersSidebarProps) => {
    const [members, setMembers] = useState<IUser[]>([])

    const extractMembers = (): IUser[] => {
        let tempUser
        let membersList = Array.from(
            data.team.members.map((memberWrapper) => {
                tempUser = Object.create(memberWrapper.user)
                tempUser.role = memberWrapper.teamRole.name

                return tempUser
            })
        )
        return membersList
    }
    useEffect(() => {
        if (!loading) {
            setMembers(extractMembers())
        }
    }, [data])
    return (
        <div className="p-1 drop-shadow-md">
            <div className="flex w-full justify-between rounded-tr-xl rounded-tl-xl bg-[#E8E8E8] p-4 drop-shadow-md">
                <span className="text-xl font-medium">Members</span>
                <div className="cursor-pointer text-lg text-[#3B8CD7]">Manage</div>
            </div>
            <div className="tags flex flex-wrap rounded-br-md rounded-bl-md bg-white">
                {members.length == 0 && (
                    <div className="w-full py-4 text-center text-xl font-medium">
                        No Other Members
                    </div>
                )}
                {members.map((member, index) => {
                    return <UserTab user={member} key={index} usage="TeamMembers" />
                })}
            </div>
        </div>
    )
}

export default TeamMemberSidebar
