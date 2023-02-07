import 'react-quill/dist/quill.core.css';
import Icons from '@/components/atoms/Icons'
import Avatar from '@/components/molecules/Avatar'
import Bookmark from '@/components/molecules/Bookmark'
import Tags from '@/components/molecules/Tags'
import Votes from '@/components/molecules/Votes'
import { parseHTML } from '@/helpers/htmlParsing'
import Link from 'next/link'
import { Fragment } from 'react'
import AnswerComponent from '../AnswerComponent'

type QuestionDetailProps = {
    id: number
    title: string
    content: string
    created_at: string
    views_count: number
    vote_count: number
    tags: { id: number; name: string; is_watched_by_user: boolean }[]
    user: { id: number; first_name: string; last_name: string; avatar: string }
    is_bookmark: boolean
}

const QuestionDetail = ({
    id,
    title,
    content,
    created_at,
    views_count,
    vote_count,
    tags,
    user,
    is_bookmark,
}: QuestionDetailProps): JSX.Element => {
    return (
        <Fragment>
            <div className="flex w-full flex-col">
                <div className="relative flex w-full flex-col gap-3">
                    <Link href="#" className="absolute top-0 right-0 cursor-pointer">
                        <Icons name="square_edit" />
                    </Link>
                    <div className="w-full text-2xl font-bold">{title}</div>
                    <div className="flex w-full flex-row gap-3 text-xs font-semibold">
                        <div className="flex gap-1">
                            <span>Asked</span>
                            <span className="text-gray-500">{created_at}</span>
                        </div>
                        <div className="flex gap-1">
                            <span>Viewed</span>
                            <span className="text-gray-500">{views_count} times</span>
                        </div>
                    </div>
                    <div className="flex w-full flex-row">
                        <div className="flex w-14 flex-col items-start">
                            <div className="flex flex-col items-center gap-2">
                                <Votes count={vote_count} />
                                <Bookmark is_bookmark={is_bookmark} />
                            </div>
                        </div>
                        <div className="flex w-full flex-col justify-between gap-3">
                            <div className="flex w-full flex-col gap-3 ql-snow">
                                <div className="w-full ql-editor">{parseHTML(content)}</div>
                                <div className="w-full">
                                    <Tags values={tags} />
                                </div>
                            </div>
                            <div className="flex w-full flex-row justify-between">
                                <div className="flex items-end justify-start">
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href="#"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Share
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Close
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex min-w-fit flex-row">
                                    <Avatar
                                        first_name={user.first_name}
                                        last_name={user.last_name}
                                        avatar={user.avatar}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-20">
                <AnswerComponent />
            </div>
        </Fragment>
    )
}

export default QuestionDetail
