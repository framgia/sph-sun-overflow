import { Fragment } from 'react'
import Avatar from 'react-avatar'

interface ProfileImageProps {
    first_name: string
    last_name: string
    avatar: string
    updated_at?: string
}

const ProfileImage = ({ first_name, last_name, avatar, updated_at }: ProfileImageProps) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="relative flex place-content-center ">
                <div className="relative aspect-square">
                    <Avatar
                        round={true}
                        name={`${first_name} ${last_name}`}
                        size="200"
                        alt={first_name}
                        src={avatar ? `${avatar}?${updated_at}` : `${first_name}`}
                        maxInitials={1}
                        textSizeRatio={2}
                    />
                </div>
            </div>
            <div className="flex px-6 text-center text-2xl font-semibold line-clamp-3">
                {first_name} {last_name}
            </div>
        </div>
    )
}
export default ProfileImage
