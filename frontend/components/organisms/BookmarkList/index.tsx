import type { BookmarkType } from '@/pages/users/[slug]'
import AnswerBookmark from '../AnswerBookmark'
import QuestionList from '../QuestionList'

const BookmarkList = ({ id, bookmarkable }: BookmarkType): JSX.Element => {
    switch (bookmarkable?.__typename) {
        case 'Question':
            return (
                <QuestionList
                    key={id}
                    id={bookmarkable.id}
                    title={bookmarkable.title}
                    question_slug={bookmarkable.slug}
                    content={bookmarkable.content}
                    created_at={bookmarkable.created_at}
                    humanized_created_at={bookmarkable.humanized_created_at}
                    vote_count={bookmarkable.vote_count}
                    answer_count={bookmarkable.answers?.length}
                    view_count={bookmarkable.views_count}
                    tags={bookmarkable.tags ?? []}
                    user={bookmarkable.user}
                    bookmarkType="Question"
                />
            )
        case 'Answer':
            return <AnswerBookmark id={id} bookmarkable={bookmarkable} />
        default:
            return (
                <div className="mt-10 text-center text-lg font-bold text-primary-gray">
                    No bookmark to show
                </div>
            )
    }
}

export default BookmarkList
