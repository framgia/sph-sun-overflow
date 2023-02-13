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
                className="text-overflow-ellipsis flex h-20 w-full items-center overflow-hidden border-b-2 border-b-secondary-gray last:rounded-md last:border-b-0 hover:bg-[#E8E8E8]"
                href={`/user/${user.id}`}
            >
                <img
                    className="mx-4 h-[40px] w-[40px] rounded-full rounded-full bg-gray-800 text-sm active:ring-2 active:ring-red-500 md:mr-0"
                    src={
                        user.avatar ? user.avatar : 'https://www.w3schools.com/howto/img_avatar.png'
                    }
                    alt="user photo"
                    width={15}
                    height={15}
                />
                <div className="text-overflow-ellipsis ml-2 flex flex-col overflow-hidden align-middle">
                    <div className="text-md ">
                        {user.first_name} {user.last_name}
                    </div>
                    <div className="hidden text-sm lg:flex">{user.role}</div>
                    <div className="text-sm">{user.reputation} Score</div>
                </div>
            </Link>
        )
    }

    return <></>
}
export default TeamMemberSidebar
