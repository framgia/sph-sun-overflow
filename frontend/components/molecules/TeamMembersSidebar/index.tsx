import { useEffect, useState } from 'react'
import Link from 'next/link'
import { isObjectEmpty } from '@/utils'

interface IUser {
    id: number
    first_name: string
    last_name: string
    avatar: string
    reputation: number
    role: string
}
interface UserTabProps {
    user: IUser
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
            <div className="flex justify-between p-4 bg-[#E8E8E8] w-full rounded-tr-xl rounded-tl-xl drop-shadow-md">
                <span className="text-xl font-medium">Members</span>
                <div className="text-lg cursor-pointer text-[#3B8CD7]">Manage</div>
            </div>
            <div className="bg-white tags flex flex-wrap rounded-br-md rounded-bl-md">
                {members.length == 0 && (
                    <div className="text-center text-xl font-medium w-full py-4">
                        No Other Members
                    </div>
                )}
                {members.map((member, index) => {
                    return <UserTab user={member} key={index} />
                })}
            </div>
        </div>
    )
}

const UserTab = ({ user }: UserTabProps) => {
    if (!isObjectEmpty(user)) {
        return (
            <Link
                className="flex w-full h-20 hover:bg-[#E8E8E8] items-center overflow-hidden text-overflow-ellipsis border-b-2 border-b-secondary-gray last:rounded-md last:border-b-0"
                href={`/user/${user.id}`}
            >
                <img
                    className="w-[40px] h-[40px] rounded-full mx-4 text-sm bg-gray-800 rounded-full md:mr-0 active:ring-2 active:ring-red-500"
                    src={
                        user.avatar ? user.avatar : 'https://www.w3schools.com/howto/img_avatar.png'
                    }
                    alt="user photo"
                    width={15}
                    height={15}
                />
                <div className="flex flex-col align-middle ml-2 overflow-hidden text-overflow-ellipsis">
                    <div className="text-md ">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="text-sm hidden lg:flex">{user.role}</div>
                    <div className="text-sm">{user.reputation} Score</div>
                </div>
            </Link>
        )
    }

    return <></>
}
export default TeamMemberSidebar
