import Link from 'next/link'
import { isObjectEmpty } from '@/utils'
import Avatar from 'react-avatar'

export interface IUser {
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

interface UserTabProps {
    user: IUser
    usage: 'TeamMembers' | 'UserList'
}

const UserTab = ({ user, usage }: UserTabProps) => {
    const cardStyle = {
        TeamMembers: 'h-20 border-b-2 border-b-secondary-gray last:rounded-md last:border-b-0 pl-4',
        UserList: 'my-2 py-2 px-2',
    }
    const imgSize = {
        TeamMembers: '40',
        UserList: '70',
    }
    const nameStyle = {
        TeamMembers: 'text-md',
        UserList: 'text-xl font-semibold truncate',
    }
    const roleStyle = {
        TeamMembers: 'hidden text-sm lg:flex',
        UserList: 'text-xl text-primary-gray truncate',
    }
    if (!isObjectEmpty(user)) {
        return (
            <Link
                className={`text-overflow-ellipsis flex  w-full items-center overflow-hidden  hover:bg-[#E8E8E8] ${cardStyle[usage]}`}
                href={`/users/${user.slug}`}
            >
                <Avatar
                    round={true}
                    name={`${user.first_name} ${user.last_name}`}
                    size={imgSize[usage]}
                    alt={user.first_name}
                    src={user.avatar}
                    maxInitials={1}
                    textSizeRatio={2}
                    className={`flex-0 aspect-square bg-gray-800 text-sm active:ring-2 active:ring-red-500 md:mr-0`}
                />
                <div className="text-overflow-ellipsis ml-4 flex flex-col overflow-hidden align-middle">
                    <div className={nameStyle[usage]}>
                        {user.first_name} {user.last_name}
                    </div>
                    <div className={roleStyle[usage]}>{user.role.name}</div>
                    <div className="hidden  lg:flex">
                        {usage === 'UserList' ? (
                            <div className="text-md font-bold">{user.reputation} pts</div>
                        ) : (
                            <div className="text-sm">{user.reputation} Score</div>
                        )}
                    </div>
                </div>
            </Link>
        )
    }

    return <></>
}

export default UserTab
