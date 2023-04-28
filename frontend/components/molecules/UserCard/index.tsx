import Link from 'next/link'
import Avatar from 'react-avatar'
import type { IUser } from '../UserTab'

type UserProps = {
    user: IUser
}

const UserCard = ({ user }: UserProps): JSX.Element => {
    return (
        <Link
            href={`/users/${user.slug}`}
            title={`${user.first_name} ${user.last_name}`}
            className="min-w-sm max-w-md rounded-[5px] border border-neutral-disabled bg-white"
        >
            <div className="flex flex-row items-center justify-start gap-2 p-4">
                <div>
                    <Avatar
                        round={true}
                        name={`${user.first_name} ${user.last_name}`}
                        size="56"
                        alt={user.first_name}
                        src={user.avatar}
                        maxInitials={1}
                        textSizeRatio={2}
                        className={`flex-0 aspect-square border border-[#3D3D3D] text-sm`}
                    />
                </div>
                <div className="flex h-[53px] w-full flex-col gap-1">
                    <span className="text-left text-sm font-medium leading-[120%] text-neutral-900 line-clamp-1">
                        {`${user.first_name} ${user.last_name}`}
                    </span>
                    <span className="text-left text-xs font-normal text-neutral-disabled line-clamp-1">
                        {user.role.name}
                    </span>
                    <span className="text-left text-xs font-normal text-neutral-900 line-clamp-1">
                        {user.reputation} points
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default UserCard
