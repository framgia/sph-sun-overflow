import Button from '@/components/atoms/Button'
import ProfileImage from '@/components/atoms/ProfileImage'
import AboutMe from '@/components/molecules/AboutMe'
import { ProfileType } from '@/pages/users/[slug]'
import { Fragment, MouseEventHandler } from 'react'

type Props = {
    user_id: number
    profile: ProfileType
    onClickProfileEdit: MouseEventHandler
}

const ProfileInfo = ({ user_id, profile, onClickProfileEdit }: Props): JSX.Element => {
    return (
        <Fragment>
            <div className="flex w-2/6 flex-col">
                <ProfileImage
                    first_name={profile.first_name}
                    last_name={profile.last_name}
                    avatar={profile.avatar}
                />
            </div>
            <div className="flex w-4/6 flex-col">
                <AboutMe about_me={profile.about_me} />
            </div>
            {profile.id === user_id && (
                <Button
                    onClick={onClickProfileEdit}
                    additionalClass="absolute top-[3px] right-0 bg-white !font-bold"
                >
                    Edit Profile
                </Button>
            )}
        </Fragment>
    )
}

export default ProfileInfo
