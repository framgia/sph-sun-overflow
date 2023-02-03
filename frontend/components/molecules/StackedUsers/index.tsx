interface StackedUsersProps {
    images: string[]
}

const StackedUsers = ({ images }: StackedUsersProps) => {
    if (images.length === 0) {
        return <div className="flex">No Members yet</div>
    }
    if (images.length > 5) {
        images = images.slice(0, 4)
    }
    return (
        <div className="hidden lg:flex flex-row -space-x-7">
            {images.length &&
                images.map((imageUrl, index) => {
                    return (
                        <img
                            key={index}
                            className="w-[40px] h-[40px] rounded-full"
                            src={imageUrl}
                            alt="user photo"
                        />
                    )
                })}
        </div>
    )
}
export default StackedUsers
