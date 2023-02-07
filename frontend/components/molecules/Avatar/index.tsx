import Icons from '@/components/atoms/Icons'
import Image from 'next/image'

type AvatarProps = {
    first_name: string
    last_name: string
    avatar: string
}

const Avatar = ({ first_name, last_name, avatar }: AvatarProps): JSX.Element => {
    return (
        <div className="flex flex-row items-center gap-1 gap-2 rounded-xl bg-red-300 py-2 pl-3 pr-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs">
            <img src={avatar} className="rounded-full" />
            </div>
            <span className="text-md">
                {first_name} {last_name}
            </span>
        </div>
    )
}

export default Avatar
