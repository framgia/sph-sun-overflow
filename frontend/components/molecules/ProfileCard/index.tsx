import Button from '@/components/atoms/Button'
import { Fragment } from 'react'
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
    handleFollower?: (input: boolean) => void
    handleFollowing?: (input: boolean) => void
    handleEditModal?: (input: boolean) => void
    id: number
    isPublic: boolean
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
    role,
    isPublic,
    toggleFollow,
    handleFollower,
    handleFollowing,
    handleEditModal,
}: ProfileCardProps): JSX.Element => {
    const onClickFollow = (): void => {
        toggleFollow({
            variables: {
                userId: id,
            },
        })
    }
    return (
        <Fragment>
            <div className="flex h-fit w-full shrink-0 flex-col space-y-4 bg-white p-4 drop-shadow-md xl:w-[235px]">
                <div className="flex w-full flex-row gap-4 self-center xl:w-[171px] xl:flex-col">
                    <div className="Avatar flex w-full flex-col items-center space-y-2">
                        <Avatar
                            round
                            name={`${first_name} ${last_name}`}
                            alt={first_name}
                            src={
                                avatar ? `${avatar}?${updated_at}` : `${avatar}?${updated_at ?? ''}`
                            }
                            maxInitials={1}
                            textSizeRatio={2}
                            size="120"
                            className="object-cover"
                        />
                        <div className="w-full">
                            <div className="flex flex-row items-center justify-between">
                                <div className="text-sm font-bold leading-[120%]">{`${first_name} ${last_name}`}</div>
                                {!isPublic && (
                                    // <EditProfileModal
                                    //     {...{ first_name, last_name, about_me, avatar, updated_at }}
                                    // />
                                    <div
                                        className="h-4 cursor-pointer text-xs font-semibold leading-[120%] text-neutral-900 hover:underline"
                                        onClick={() => {
                                            handleEditModal?.(true)
                                        }}
                                    >
                                        Edit
                                    </div>
                                )}
                            </div>
                            <div className="pt-1 text-xs leading-[125%]">{`${role.name}`}</div>
                        </div>
                    </div>
                    <div className="AboutMe flex w-full flex-col gap-1">
                        <div className="text-sm font-semibold leading-[120%]">About Me</div>
                        <div className="text-xs leading-[150%] line-clamp-6 xl:line-clamp-3">
                            {about_me}
                        </div>
                    </div>
                    <div className="Stats space-y-1">
                        <div className="text-sm font-semibold leading-[120%]">Stats</div>
                        <div className="flex flex-col text-xs leading-[150%]">
                            <span>Reputation: {reputation}</span>
                            <span>Questions: {question_count}</span>
                            <span>Answers: {answer_count}</span>
                        </div>
                    </div>
                    <div className="flex min-w-[100px] flex-col space-y-3 md:justify-between">
                        <div className="flex flex-col justify-between text-xs leading-5 xl:flex-row">
                            <div
                                className={`${handleFollowing ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    handleFollowing?.(true)
                                }}
                            >
                                <span className="font-bold">{following_count}</span> Following
                            </div>
                            <div
                                className={`${handleFollower ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    handleFollower?.(true)
                                }}
                            >
                                <span className="font-bold">{follower_count}</span> Followers
                            </div>
                        </div>
                        {isPublic && (
                            <div className="w-[187px]">
                                <Button usage="main-follow" onClick={onClickFollow}>
                                    {is_following ? 'Unfollow' : 'Follow'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ProfileCard
