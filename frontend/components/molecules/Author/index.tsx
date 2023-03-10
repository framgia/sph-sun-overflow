import Link from 'next/link'

type Props = {
    author?: string
    moment?: string
    slug?: string
}

const Author = ({ author, moment, slug = '' }: Props): JSX.Element => {
    return (
        <span className="flex flex-row gap-1">
            <Link href={`/users/${slug}`} className="text-blue-600 hover:text-blue-400">
                <div className="max-w-[170px] truncate">{author}</div>
            </Link>
            <span className=" text-primary-gray">{moment}</span>
        </span>
    )
}

export default Author
