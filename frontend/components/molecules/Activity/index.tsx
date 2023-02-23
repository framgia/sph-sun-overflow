import { parseHTML } from '@/helpers/htmlParsing'
import Link from 'next/link'

type ActivityProps = {
    usage: 'Question' | 'Answer'
    id: number
    slug: string
    votes: number
    is_answered?: boolean
    is_correct?: boolean
    title?: string
    content?: string
    created_at: string
}

const Activity = ({
    usage,
    id,
    slug,
    votes,
    is_answered,
    is_correct,
    title,
    content,
    created_at,
}: ActivityProps): JSX.Element => {
    const redirectTo: { Question: string; Answer: string } = {
        Question: `/questions/${slug}`,
        Answer: `/questions/${slug}#answer-${id}`,
    }

    return (
        <div className="flex h-11 flex-row justify-between">
            <div className="flex w-full flex-row">
                <div className="box-border min-w-[56px] p-2">
                    <div
                        className={`box-border h-full w-full border-2 text-center ${
                            is_answered || is_correct
                                ? 'border-green-600 bg-green-600 text-white'
                                : 'border-black'
                        }`}
                    >
                        {votes}
                    </div>
                </div>
                <div className="w-full p-2">
                    <Link href={redirectTo[usage]} className="text-blue-500">
                        <p className="line-clamp-1">
                            {title ? parseHTML(title) : parseHTML(content)}
                        </p>
                    </Link>
                </div>
            </div>
            <p className="min-w-fit p-2">{created_at}</p>
        </div>
    )
}
export default Activity
