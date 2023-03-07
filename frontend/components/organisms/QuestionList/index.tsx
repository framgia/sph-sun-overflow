import Author from '@/components/molecules/Author'
import Bookmark from '@/components/molecules/Bookmark'
import Tags from '@/components/molecules/Tags'
import Link from 'next/link'
import 'react-quill/dist/quill.snow.css'
import { parseHTML } from '../../../helpers/htmlParsing'
import { TagType, UserType } from '../../../pages/questions/[slug]'

type Props = {
    id?: number
    title?: string
    slug?: string
    content?: string
    vote_count?: number
    answer_count?: number
    view_count?: number
    created_at?: string
    humanized_created_at?: string
    tags?: TagType[]
    user?: UserType
    bookmarkType?: 'Question' | 'Answer'
    bookmarkAnswerId?: number
    page_slug?: string
    question_slug?: string
    refetch?: () => void
}

const QuestionList = ({
    id,
    title,
    slug,
    question_slug,
    content,
    vote_count,
    answer_count,
    view_count,
    created_at,
    humanized_created_at,
    tags,
    user,
    bookmarkType,
    bookmarkAnswerId,
    page_slug,
}: Props): JSX.Element => {
    const renderTeamQuestionDetailHeader = (): JSX.Element => {
        return (
            <Link
                href={`/teams/${slug}/question/${question_slug}`}
                className="text-lg text-blue-600 hover:text-blue-400"
            >
                {title}
            </Link>
        )
    }

    const renderQuestionDetailHeader = (): JSX.Element => {
        return (
            <Link href={`/questions/${slug}`} className="text-lg text-blue-600 hover:text-blue-400">
                {title}
            </Link>
        )
    }

    return (
        <div className="flex w-full flex-row p-5">
            <div className="flex w-[15%] flex-col">
                <div className="text-sm">
                    {vote_count} {vote_count !== 1 ? 'Votes' : 'Vote'}
                </div>
                <div className="text-sm">
                    {answer_count} {answer_count !== 1 ? 'Answers' : 'Answer'}
                </div>
                <div className="text-sm">
                    {view_count} {view_count !== 1 ? 'Views' : 'View'}
                </div>
            </div>
            <div className="flex w-[85%] flex-col gap-4">
                <div className="flex w-full justify-between">
                    {page_slug == 'teams'
                        ? renderTeamQuestionDetailHeader()
                        : page_slug == 'questions'
                        && renderQuestionDetailHeader()}
                    {bookmarkType && (
                        <Bookmark
                            bookmarkable_id={bookmarkType === 'Answer' ? bookmarkAnswerId! : id!}
                            bookmarkable_type={bookmarkType}
                            refetchHandler={() => {}}
                            is_bookmarked
                        />
                    )}
                </div>
                <div className="ql-snow flex w-full flex-col gap-1">
                    <div className="ql-editor question-parsed-content w-full">
                        <span className="line-clamp-2">{parseHTML(content)}</span>
                    </div>
                    <div className="mt-[-0.8rem] flex flex-col gap-2">
                        <div className="w-full">
                            <Tags values={tags} />
                        </div>
                        <div className="flex flex-row justify-end">
                            <Author
                                author={`${user?.first_name} ${user?.last_name}`}
                                moment={humanized_created_at}
                                slug={user.slug}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionList
