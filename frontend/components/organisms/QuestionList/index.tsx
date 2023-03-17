import Author from '@/components/molecules/Author'
import Bookmark from '@/components/molecules/Bookmark'
import Tags from '@/components/molecules/Tags'
import Link from 'next/link'
import 'react-quill/dist/quill.snow.css'
import Icons from '@/components/atoms/Icons'
import { parseHTML } from '../../../helpers/htmlParsing'
import type { TagType, UserType } from '../../../pages/questions/[slug]'

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
    tags: TagType[]
    user?: UserType
    bookmarkType?: 'Question' | 'Answer'
    bookmarkAnswerId?: number
    page_slug?: string
    question_slug?: string
    refetch?: () => void
    team_name?: string
    team_slug?: string
    is_public?: boolean
}

const QuestionList = ({
    id = 0,
    title,
    slug = '',
    question_slug = '',
    content,
    vote_count,
    answer_count,
    view_count,
    created_at,
    humanized_created_at,
    tags,
    user,
    bookmarkType,
    bookmarkAnswerId = 0,
    page_slug,
    team_name,
    team_slug,
    is_public,
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
            <Link
                href={`/questions/${question_slug}`}
                className="text-lg text-blue-600 hover:text-blue-400"
            >
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
                    {page_slug === 'teams'
                        ? renderTeamQuestionDetailHeader()
                        : page_slug === 'questions' && renderQuestionDetailHeader()}
                    {bookmarkType && (
                        <Bookmark
                            bookmarkable_id={bookmarkType === 'Answer' ? bookmarkAnswerId : id}
                            bookmarkable_type={bookmarkType}
                            refetchHandler={() => {}}
                            is_bookmarked
                        />
                    )}
                    {slug && (
                        <div className="flex items-center gap-2">
                            <span>{is_public ? 'Public' : 'Private'} </span>
                            <Icons name={is_public ? 'public' : 'private'} />
                        </div>
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
                            <div className="flex flex-col">
                                <Author
                                    author={`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
                                    moment={humanized_created_at}
                                    slug={user?.slug}
                                />
                                {team_name && (
                                    <div className="ml-4 flex justify-end gap-1 text-primary-gray">
                                        From Team:
                                        <Link
                                            href={`/teams/${team_slug ?? ''}`}
                                            className="text-blue-600 hover:text-blue-400"
                                        >
                                            <div className="max-w-[170px] truncate">
                                                {team_name}
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionList
