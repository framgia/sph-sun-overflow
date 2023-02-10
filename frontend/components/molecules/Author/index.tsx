import Link from 'next/link'

type Props = {
    author: string
    moment: string
}

const Author = ({ author, moment }: Props): JSX.Element => {
    return (
        <span className="flex flex-row gap-2">
            <span className="ml-4">
                <Link href="#" className="text-blue-600 hover:text-blue-400">
                    {author}
                </Link>
            </span>
            <span className="text-primary-gray">{moment}</span>
        </span>
    )
}

export default Author
