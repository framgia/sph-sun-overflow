import AnswerDetail from '@/components/organisms/AnswerDetail'
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

    const answer: {
        id: number
        content: string
        created_at: string
        vote_count: number
        is_bookmark: boolean
        is_correct: boolean
        user: { id: number; first_name: string; last_name: string; avatar: string }
    } = {
        id: Number(query.id),
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore',
        created_at: '2 days ago',
        vote_count: 2,
        is_bookmark: false,
        is_correct: true,
        user: {
            id: 2,
            first_name: 'John',
            last_name: 'Doe',
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
                <div className="my-4 w-full border-t-2" />
                <AnswerDetail
                    id={answer.id}
                    content={answer.content}
                    created_at={answer.created_at}
                    vote_count={answer.vote_count}
                    is_bookmark={answer.is_bookmark}
                    is_correct={answer.is_correct}
                    user={answer.user}
                />
            </div>
        </Fragment>
    )
}

export default QuestionDetailPage
