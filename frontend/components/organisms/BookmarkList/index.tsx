import { QuestionType, TagType, UserType } from '@/pages/questions/[slug]'
import { BookmarkType } from '@/pages/users/[id]'
import AnswerBookmark from '../AnswerBookmark'
import QuestionList from '../QuestionList'

const BookmarkList = ({ id, bookmarkable }: BookmarkType): JSX.Element => {
    switch (bookmarkable.__typename) {
        case 'Question':
            return (
                <QuestionList
                    key={id}
                    id={bookmarkable.id}
                    title={bookmarkable.title}
                    slug={bookmarkable.slug}
                    content={bookmarkable.content}
                    created_at={bookmarkable.created_at}
                    humanized_created_at={bookmarkable.humanized_created_at}
                    vote_count={bookmarkable.vote_count}
                    answer_count={bookmarkable.answer_count}
                    view_count={bookmarkable.views_count}
                    tags={bookmarkable.tags}
                    user={bookmarkable.user}
                />
            )
        case 'Answer':
            return <AnswerBookmark id={id} bookmarkable={bookmarkable} />
        default:
            return <div>No bookmarks to show...</div>
    }
}

export default BookmarkList
