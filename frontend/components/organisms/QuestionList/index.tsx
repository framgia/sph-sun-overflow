import Author from '@/components/molecules/Author'
import Tags from '@/components/molecules/Tags'
import Link from 'next/link'

type Props = {
    id: number
    title: string
    content: string
    vote_count: number
    answer_count: number
    view_count: number
    created_at: string
    tags: { id: number; name: string; is_watched_by_user: boolean }[]
    user: { id: number; first_name: string; last_name: string; avatar: string }
}

const QuestionList = ({
    id,
    title,
    content,
    vote_count,
    answer_count,
    view_count,
    created_at,
    tags,
    user,
}: Props): JSX.Element => {
    return (
        <div className="flex w-full flex-row p-5">
            <div className="flex w-36 flex-col">
                <div className="text-sm">
                    {vote_count} {vote_count > 1 ? 'Votes' : 'Vote'}
                </div>
                <div className="text-sm">
                    {answer_count} {answer_count > 1 ? 'Answers' : 'Answer'}
                </div>
                <div className="text-sm">
                    {view_count} {view_count > 1 ? 'Views' : 'View'}
                </div>
            </div>
            <div className="flex w-full flex-col gap-4">
                <div className="w-full">
                    <Link href="#" className="text-lg text-blue-600 hover:text-blue-400">
                        {title}
                    </Link>
                </div>
                <div className="flex w-full flex-col gap-1">
                    <div className="w-full">{content}</div>
                    <div className="flex flex-col gap-2">
                        <div className="w-full">
                            <Tags values={tags} />
                        </div>
                        <div className="flex flex-row justify-end">
                            <Author
                                author={`${user.first_name} ${user.last_name}`}
                                moment={created_at}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionList
