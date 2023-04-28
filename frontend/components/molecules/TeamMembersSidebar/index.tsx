import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UserTab from '../UserTab'
interface IUser {
    id: number
    first_name: string
    last_name: string
    avatar: string
    reputation: number
    role: {
        id: number
        name: string
    }
    slug: string
}

interface MembersSidebarProps {
    loading: boolean

    data: {
        team: {
            is_team_leader: boolean
            members: Array<{
                teamRole: { name: string }
                user: IUser
            }>
        }
    }
}

const TeamMemberSidebar = ({ data, loading }: MembersSidebarProps): JSX.Element => {
    const router = useRouter()
    const usePath = (path: string): string => `${router.asPath}${path}`
    const [members, setMembers] = useState<IUser[]>([])

    const extractMembers = (): IUser[] => {
        let tempUser
        const membersList = Array.from(
            data.team.members.map((memberWrapper) => {
                tempUser = Object.create(memberWrapper.user)
                tempUser.role = memberWrapper.teamRole

                return tempUser
            })
        )

        return membersList
    }
    useEffect(() => {
        if (!loading) {
            setMembers(extractMembers())
        }
    }, [data, loading])

    return (
        <div className="p-1 drop-shadow-md">
            <div className="flex w-full justify-between rounded-tr-xl rounded-tl-xl bg-primary-200 p-4 text-neutral-900 drop-shadow-md">
                <span className="text-xl font-medium">Members</span>
                {data?.team?.is_team_leader && (
                    <Link
                        className="cursor-pointer text-lg text-[#3B8CD7]"
                        href={`${usePath('/manage')}`}
                    >
                        Manage
                    </Link>
                )}
            </div>

            {members.length === 0 ? (
                <div className="tags no-scrollbar flex  flex-wrap overflow-y-scroll rounded-br-md rounded-bl-md bg-white">
                    <div className="w-full py-4 text-center text-xl font-medium">
                        No Other Members
                    </div>
                </div>
            ) : (
                <div className="tags h-[49vh] overflow-y-scroll rounded-br-md rounded-bl-md bg-white">
                    {members.map((member, index) => {
                        return <UserTab user={member} key={index} usage="TeamMembers" />
                    })}
                </div>
            )}
        </div>
    )
}

export default TeamMemberSidebar
