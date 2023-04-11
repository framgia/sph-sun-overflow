import Avatar from 'react-avatar'
interface StackedUsersProps {
    images: Array<{
        user: {
            first_name: string
            last_name: string
            avatar: string
        }
    }>
}

const StackedUsers = ({ images }: StackedUsersProps): JSX.Element => {
    if (images.length === 0) {
        return <div className="flex">No Members yet</div>
    }
    if (images.length > 5) {
        images = images.slice(0, 4)
    }
    return (
        <div className="hidden flex-row -space-x-5 lg:flex">
            {images.length &&
                images.map((image, index) => {
                    return (
                        <Avatar
                            key={index}
                            round={true}
                            name={`${image.user.first_name} ${image.user.last_name}`}
                            size="40"
                            alt={image.user.first_name}
                            src={image.user.avatar}
                            maxInitials={1}
                            textSizeRatio={2}
                            className={`flex-0 aspect-square bg-gray-800 text-sm`}
                        />
                    )
                })}
        </div>
    )
}
export default StackedUsers
