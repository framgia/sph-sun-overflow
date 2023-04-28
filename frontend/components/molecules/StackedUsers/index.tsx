import Avatar from 'react-avatar'
interface StackedUsersProps {
    images: Array<{
        user: {
            first_name: string
            last_name: string
            avatar: string
        }
    }>
    memberCount: number
}

const StackedUsers = ({ images, memberCount }: StackedUsersProps): JSX.Element => {
    if (images.length === 0) {
        return <div className="flex">No Members yet</div>
    }
    if (images.length > 4) {
        images = images.slice(0, 3)
    }
    return (
        <div className="hidden flex-row -space-x-1 lg:flex">
            {images.length &&
                images.map((image, index) => {
                    return (
                        <Avatar
                            key={index}
                            round={true}
                            name={`${image.user.first_name} ${image.user.last_name}`}
                            size="24"
                            alt={image.user.first_name}
                            src={image.user.avatar}
                            maxInitials={1}
                            textSizeRatio={2}
                            className={`flex-0 aspect-square border border-neutral-white bg-neutral-white text-sm`}
                        />
                    )
                })}
            {memberCount > 4 && (
                <div className="flex-0 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-white bg-neutral-200 align-middle text-[10px] text-neutral-700">{`+${Math.min(
                    memberCount - 3,
                    99
                )}`}</div>
            )}
        </div>
    )
}
export default StackedUsers
