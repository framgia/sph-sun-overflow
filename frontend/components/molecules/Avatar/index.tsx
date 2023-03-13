import Link from 'next/link'

type AvatarProps = {
    first_name?: string
    last_name?: string
    avatar?: string
    slug?: string
}

const Avatar = ({ first_name, last_name, avatar, slug = '' }: AvatarProps): JSX.Element => {
    return (
        <Link href={`/users/${slug}`}>
            <div className="flex h-10 flex-row items-center gap-1 rounded-xl bg-red-300 py-2 pl-3 pr-5">
                <div className="mr-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs">
                    <img src={avatar} className="rounded-full" />
                </div>
                <div className="max-w-[180px] truncate">
                    {first_name} {last_name}
                </div>
            </div>
        </Link>
    )
}

export default Avatar
