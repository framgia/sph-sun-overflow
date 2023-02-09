import 'react-quill/dist/quill.core.css'
import Icons from '@/components/atoms/Icons'
import Avatar from '@/components/molecules/Avatar'
import Bookmark from '@/components/molecules/Bookmark'
import Votes from '@/components/molecules/Votes'
import Link from 'next/link'
import { Fragment } from 'react'
import AcceptAnswer from '@/components/molecules/AcceptAnswer'
import { parseHTML } from '@/helpers/htmlParsing'

type AnswerDetailProps = {
    id: number
    content: string
    created_at: string
    vote_count: number
    is_bookmark: boolean
    is_correct: boolean
    user: { id: number; first_name: string; last_name: string; avatar: string }
    is_created_by_user: boolean
}

const Answer = ({
    id,
    content,
    created_at,
    vote_count,
    is_bookmark,
    is_correct,
    user,
    is_created_by_user,
}: AnswerDetailProps): JSX.Element => {
    return (
        <Fragment>
            <div className="flex w-full flex-col py-3">
                <div className="flex w-full flex-row">
                    <div className="flex w-14 flex-col items-start gap-2">
                        <Votes count={vote_count} />
                        <Bookmark is_bookmark={is_bookmark} />
                        <AcceptAnswer is_correct={is_correct} />
                    </div>
                    <div className="ql-snow flex w-full flex-col justify-between">
                        <div className="ql-editor mt-2 w-full pr-2 text-justify">
                            {parseHTML(content)}
                        </div>
                        <div className="flex w-full flex-row justify-between">
                            <div className="flex justify-start">
                                <div className="mt-2 flex items-start">
                                    {is_created_by_user && (
                                        <Link
                                            href="#"
                                            className="flex gap-1 decoration-red-500 underline-offset-2 hover:underline"
                                        >
                                            <Icons name={'edit'} />
                                            <span className="text-xs text-primary-red">
                                                Edit Answer
                                            </span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="flex min-w-fit flex-col">
                                <div className="mb-0.5 ml-1 flex w-full flex-row text-xs">
                                    <div className="flex justify-start gap-1">
                                        <span>answered</span>
                                        <span className="text-gray-500"> {created_at}</span>
                                    </div>
                                </div>
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
        </Fragment>
    )
}

export default Answer
