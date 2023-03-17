import Author from '@/components/molecules/Author'
import { parseHTML } from '@/helpers/htmlParsing'
import type { BookmarkType } from '@/pages/users/[slug]'
import Link from 'next/link'
import QuestionList from '../QuestionList'

const AnswerBookmark = ({ id, bookmarkable }: BookmarkType): JSX.Element => {
    const question = bookmarkable?.question

    return (
        <div className="flex w-full flex-col divide-y divide-primary-gray">
            <QuestionList
                id={question?.id}
                title={question?.title}
                slug={question?.slug}
                content={question?.content}
                created_at={question?.created_at}
                humanized_created_at={question?.humanized_created_at}
                vote_count={question?.vote_count}
                answer_count={question?.answers.length}
                view_count={question?.views_count}
                tags={question?.tags ?? []}
                user={question?.user}
                bookmarkType="Answer"
                bookmarkAnswerId={bookmarkable?.id}
            />
            <div className="px-10 py-3">
                <div className="flex w-full flex-col border-l-4 border-primary-gray px-4">
                    <div className="text-sm">
                        {bookmarkable?.vote_count}{' '}
                        {bookmarkable?.vote_count !== 1 ? 'Votes' : 'Vote'}
                    </div>
                    <div>{parseHTML(bookmarkable?.content)}</div>
                    <div className="flex w-full flex-row justify-between">
                        <Link
                            href={`/questions/${bookmarkable?.question?.slug ?? ''}#answer-${
                                bookmarkable?.id ?? ''
                            }`}
                            className="text-xs text-blue-600 hover:underline"
                        >
                            View answer
                        </Link>
                        <Author
                            slug={bookmarkable?.user.slug}
                            author={`${bookmarkable?.user.first_name ?? ''} ${
                                bookmarkable?.user.last_name ?? ''
                            }`}
                            moment={bookmarkable?.humanized_created_at}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnswerBookmark
