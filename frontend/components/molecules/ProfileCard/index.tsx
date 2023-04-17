import Button from '@/components/atoms/Button'
import EditProfileModal from '@/components/organisms/EditProfileModal'
import FollowModal from '@/components/organisms/FollowModal'
import type { TFollowInstance } from '@/components/templates/Profile'
import { Fragment, useState } from 'react'
import Avatar from 'react-avatar'

export type ProfileCardProps = {
    avatar: string
    first_name: string
    last_name: string
    about_me: string
    reputation: number
    question_count: number
    answer_count: number
    follower_count: number
    following_count: number
    updated_at: string
    is_following: boolean
    role: {
        name: string
    }
    toggleFollow: (input: { variables: { userId: number } }) => void
    id: number
    isPublic: boolean
    followers: Array<{
        follower: TFollowInstance
    }>
    following: Array<{
        following: TFollowInstance
    }>
}

const ProfileCard = ({
    id,
    avatar,
    first_name,
    last_name,
    about_me,
    reputation,
    question_count,
    answer_count,
    follower_count,
    following_count,
    updated_at,
    is_following,
    followers,
    following,
    role,
    toggleFollow,
    isPublic,
}: ProfileCardProps): JSX.Element => {
    const [isOpenFollower, setIsOpenFollower] = useState<boolean>(false)
    const [isOpenFollowing, setIsOpenFollowing] = useState<boolean>(false)
    const onClickFollow = (): void => {
        toggleFollow({
            variables: {
                userId: id,
            },
        })
    }
    const handleFollower = (input: boolean): void => {
        setIsOpenFollower(input)
    }
    const handleFollowing = (input: boolean): void => {
        setIsOpenFollowing(input)
    }
    return (
        <Fragment>
            <div className="flex h-fit flex-col space-y-4 bg-white p-4 drop-shadow-md">
                <div className="flex w-full flex-row gap-4 lg:w-[171px] lg:flex-col ">
                    <div className="Avatar flex w-full flex-col items-center gap-1">
                        <Avatar
                            round
                            name={`${first_name} ${last_name}`}
                            alt={first_name}
                            src={avatar ? `${avatar}` : `${avatar}?${updated_at ?? ''}`}
                            maxInitials={1}
                            textSizeRatio={2}
                            size="120"
                            className="object-cover"
                        />
                        <div className="w-full">
                            <div className="flex flex-row items-center justify-between">
                                <div className="text-xl font-bold leading-[120%]">{`${first_name} ${last_name}`}</div>
                                {!isPublic && (
                                    <EditProfileModal
                                        {...{ first_name, last_name, about_me, avatar, updated_at }}
                                    />
                                )}
                            </div>
                            <div className="text-xs leading-[125%]">{`${role.name}`}</div>
                        </div>
                    </div>
                    <div className="AboutMe flex w-full flex-col gap-1">
                        <div className="font-semibold leading-[120%]">About Me</div>
                        <div className="text-xs leading-[150%] line-clamp-6 lg:line-clamp-3">
                            {about_me}
                        </div>
                    </div>
                    <div className="Stats space-y-1">
                        <div className="text-base font-semibold leading-[120%]">Stats</div>
                        <div className="flex flex-col text-xs leading-[150%]">
                            <span>Reputation: {reputation}</span>
                            <span>Questions: {question_count}</span>
                            <span>Answers: {answer_count}</span>
                        </div>
                    </div>
                    <div className="flex min-w-[100px] flex-col space-y-3 md:justify-between">
                        <div className="flex flex-col justify-between text-xs leading-5 lg:flex-row">
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    handleFollowing(true)
                                }}
                            >
                                <span className="font-bold">{following_count}</span> Following
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => {
                                    handleFollower(true)
                                }}
                            >
                                <span className="font-bold">{follower_count}</span> Followers
                            </div>
                        </div>
                        {isPublic && (
                            <div className="w-full">
                                <Button usage="main-follow" onClick={onClickFollow}>
                                    {is_following ? 'Unfollow' : 'Follow'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                <FollowModal
                    title="Followers"
                    content={followers}
                    isOpen={isOpenFollower}
                    setIsOpen={handleFollower}
                    toggleFollow={toggleFollow}
                />
                <FollowModal
                    title="Following"
                    content={following}
                    isOpen={isOpenFollowing}
                    setIsOpen={handleFollowing}
                    toggleFollow={toggleFollow}
                />
            </div>
        </Fragment>
    )
}
export default ProfileCard
