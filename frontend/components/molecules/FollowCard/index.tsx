import Button from '@/components/atoms/Button'
import type { TFollowInstance } from '@/components/templates/Profile'
import { useBoundStore } from '@/helpers/store'
import { useRouter } from 'next/router'
import Avatar from 'react-avatar'

type TFollowCardProps = {
    data: TFollowInstance
    usage: 'Followers' | 'Following'
    toggleFollow: (input: { variables: { userId: number } }) => void
}

const FollowCard = ({ data, usage, toggleFollow }: TFollowCardProps): JSX.Element => {
    const userSlug = useBoundStore((state) => state.slug)
    const router = useRouter()
    const { id, first_name, last_name, slug, avatar, role, is_following } = data

    const redirect = async (): Promise<void> => {
        await router.push(`/users/${slug}`)
    }
    const onClickFollow = (): void => {
        toggleFollow({
            variables: {
                userId: id,
            },
        })
    }
    const renderButton = (): JSX.Element => {
        if (userSlug === slug) return <></>
        const buttonText =
            usage === 'Followers'
                ? is_following
                    ? 'Following'
                    : 'Follow'
                : is_following
                ? 'Unfollow'
                : 'Follow'
        const usageStyle =
            usage === 'Followers'
                ? is_following
                    ? 'follow-modal-following'
                    : 'follow-modal-follow'
                : is_following
                ? 'follow-modal-unfollow'
                : 'follow-modal-follow'
        return (
            <Button usage={usageStyle} onClick={onClickFollow}>
                {buttonText}
            </Button>
        )
    }
    return (
        <div className="flex w-full flex-row justify-between px-4 py-1">
            <div className="flex h-full flex-row items-center justify-center gap-2">
                <Avatar size="40" name={`${first_name} ${last_name}`} src={avatar} round />
                <div className="gap-1">
                    <div
                        className="h-fit cursor-pointer text-sm font-medium text-neutral-900"
                        onClick={redirect}
                    >{`${first_name} ${last_name}`}</div>
                    <div className="h-fit text-xs  text-neutral-disabled">{`${role.name}`}</div>
                </div>
            </div>
            {renderButton()}
        </div>
    )
}
export default FollowCard
