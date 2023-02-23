import Link from 'next/link'

type Props = {
    author?: string
    moment?: string
    slug?: string
}

const Author = ({ author, moment, slug = '' }: Props): JSX.Element => {
    return (
        <span className="flex flex-row gap-2">
            <span className="ml-4">
                <Link href={`/users/${slug}`} className="text-blue-600 hover:text-blue-400">
                    {author}
                </Link>
            </span>
            <span className="text-primary-gray">{moment}</span>
        </span>
    )
}

export default Author
