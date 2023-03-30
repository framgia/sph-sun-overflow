import Link from 'next/link'
import Avatar from 'react-avatar'
import type { IUser } from '../UserTab'

type UserProps = {
    user: IUser
}

const UserCard = ({ user }: UserProps): JSX.Element => {
    return (
        <Link href={`/users/${user.slug}`} title={`${user.first_name} ${user.last_name}`}>
            <div className="min-w-sm max-w-md rounded-md border border-gray-300 bg-white hover:shadow-xl">
                <div className="flex flex-row items-center justify-start p-4">
                    <div className="px-4">
                        <Avatar
                            round={true}
                            name={`${user.first_name} ${user.last_name}`}
                            size="60"
                            alt={user.first_name}
                            src={user.avatar}
                            maxInitials={1}
                            textSizeRatio={2}
                            className={`flex-0 aspect-square bg-gray-800 text-sm`}
                        />
                    </div>
                    <div className="flex max-w-fit flex-col">
                        <span className="text-md font-medium leading-tight text-gray-800 line-clamp-1">
                            {`${user.first_name} ${user.last_name}`}
                        </span>
                        <span className="text-sm text-gray-500">{user.role.name}</span>
                        <span className="text-xs text-gray-800">{user.reputation} pts</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserCard
