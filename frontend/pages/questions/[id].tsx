import Comment from '@/components/organisms/Comment'
import QuestionDetail from '@/components/organisms/QuestionDetail'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const QuestionDetailPage = () => {
    const router = useRouter()
    const query = router.query

    const question: {
        id: number
        title: string
        content: string
        created_at: string
        view_count: string
        votes: { value: number }
        tags: { id: number; name: string; is_tag: boolean }[]
        is_bookmark: boolean
        user: { id: number; first_name: string; last_name: string; avatar: string }
    } = {
        id: Number(query.id),
        title: 'This is a simple question title',
        content: 'This is the description of a simple question',
        created_at: '2 days ago',
        view_count: '22 times',
        votes: {
            value: 30,
        },
        tags: [
            { id: 1, name: 'Tag 1', is_tag: false },
            { id: 2, name: 'Tag 2', is_tag: true },
            { id: 3, name: 'Tag 3', is_tag: true },
        ],
        is_bookmark: false,
        user: {
            id: 1,
            first_name: 'Luffy',
            last_name: 'Balasi',
            avatar: 'image',
        },
    }

    return (
        <Fragment>
            <div className="gap-3 py-8 pl-16 pr-52">
                <QuestionDetail
                    id={question.id}
                    title={question.title}
                    content={question.content}
                    created_at={question.created_at}
                    view_count={question.view_count}
                    votes={question.votes}
                    tags={question.tags}
                    is_bookmark={question.is_bookmark}
                    user={question.user}
                />
                <div className="mt-2 border-t-2">
                    <Comment
                        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit..."
                        author="John Doe"
                    />
                    <Comment text="This is a comment." author="James Bow" />
                    <Comment text="This is another comment!" author="Jane Dough" />
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionDetailPage
