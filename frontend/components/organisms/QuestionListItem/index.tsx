import Privacy from '@/components/molecules/Privacy'
import Tags from '@/components/molecules/Tags'
import { parseHTML } from '@/helpers/htmlParsing'
import type { TagType, UserType } from '@/pages/questions/[slug]'
import Link from 'next/link'

type QuestionListItemProps = {
    slug: string
    title: string
    content: string
    voteCount: number
    answerCount?: number
    viewCount?: number
    isPublic: boolean
    tags: TagType[]
    author: UserType
    createdAt: string
}

const QuestionListItem = ({
    slug,
    title,
    content,
    voteCount,
    answerCount,
    viewCount,
    isPublic,
    tags,
    author,
    createdAt,
}: QuestionListItemProps): JSX.Element => {
    return (
        <div className="border-b-2 border-y-neutral-200 p-2 text-neutral-900">
            <div className="flex w-full items-start gap-4 ">
                <div className="flex min-w-fit flex-col items-end gap-1 pt-1 text-xs font-light">
                    <span>
                        {voteCount} {voteCount === 1 ? 'Vote' : 'Votes'}
                    </span>
                    {answerCount !== undefined && (
                        <span>
                            {answerCount} {answerCount === 1 ? 'Answer' : 'Answers'}
                        </span>
                    )}
                    {viewCount !== undefined && (
                        <span>
                            {viewCount} {viewCount === 1 ? 'View' : 'Views'}
                        </span>
                    )}
                </div>
                <div className="flex h-32 w-9/12 flex-col gap-2 xl:w-full">
                    <span className="truncate text-sm font-semibold hover:text-primary-base">
                        <Link href={`/questions/${slug}`}>{title}</Link>
                    </span>
                    <p className="break-words text-[12px] line-clamp-2">{parseHTML(content)}</p>
                    <Tags values={tags} />
                </div>
                <div className="flex w-[5.5rem] justify-end">
                    <Privacy
                        name={isPublic ? 'Public' : 'Private'}
                        additionalClass={`${isPublic ? 'text-neutral-disabled' : ''}`}
                    />
                </div>
            </div>
            <div className="flex justify-end text-[10px]">
                <span>
                    <Link href={`/users/${String(author.slug)}`} className="text-primary-blue">
                        {author.first_name} {author.last_name}
                    </Link>
                    {` asked ${createdAt}`}
                </span>
            </div>
        </div>
    )
}

export default QuestionListItem
