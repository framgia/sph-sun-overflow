import { Fragment } from 'react'
import Avatar from 'react-avatar'

interface ProfileImageProps {
    first_name: string
    last_name: string
    avatar: string
}

const ProfileImage = ({ first_name, last_name, avatar }: ProfileImageProps) => {
    return (
        <Fragment>
            <div className="relative flex place-content-center">
                <div className="relative aspect-square w-3/5">
                    <Avatar
                        round={true}
                        name={`${first_name} ${last_name}`}
                        size="200"
                        alt={first_name}
                        src={avatar}
                        maxInitials={1}
                        textSizeRatio={2}
                    />
                </div>
            </div>
            <div className="mt-6 ml-6 flex px-6 text-center text-2xl font-semibold line-clamp-3">
                {first_name} {last_name}
            </div>
        </Fragment>
    )
}
export default ProfileImage
