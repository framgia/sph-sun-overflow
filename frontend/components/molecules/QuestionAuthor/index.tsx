import Link from 'next/link'

type Props = {
    author?: string
    moment?: string
    slug?: string
    views_count?: number
}
const QuestionAuthor = ({ author, moment, slug = '', views_count = 0 }: Props): JSX.Element => {
    return (
        <div className="flex flex-row items-center gap-1 text-xs">
            <Link href={`/users/${slug}`}>
                <span className="flex items-center text-primary-blue hover:text-blue-400">
                    {author}
                </span>
            </Link>
            <span className="text-neutral-900">asked</span>
            <span className="text-neutral-disabled">{moment}</span>
            <span className="text-neutral-900">Viewed</span>
            <span className="text-neutral-disabled">
                {views_count} {views_count > 1 ? 'times' : 'time'}
            </span>
        </div>
    )
}

export default QuestionAuthor
