import Button from '@/components/atoms/Button'
import Filters from '@/components/molecules/Filters'
import Paginate from '@/components/organisms/Paginate'
import QuestionList from '@/components/organisms/QuestionList'
import { useRouter } from 'next/router'
import React from 'react'

const QuestionsPage = (): JSX.Element => {
    const router = useRouter()
    const questionList: {
        id: number
        title: string
        content: string
        vote_count: number
        answer_count: number
        view_count: number
        created_at: string
        tags: { id: number; name: string; is_tag: boolean }[]
        user: { id: number; first_name: string; last_name: string; avatar: string }
    }[] = [
        {
            id: 1,
            title: 'This is a simple question title',
            content: 'This is the description of a simple question',
            created_at: '2 days ago',
            vote_count: 20,
            answer_count: 4,
            view_count: 25,
            tags: [
                { id: 1, name: 'Tag 1', is_tag: false },
                { id: 2, name: 'Tag 2', is_tag: true },
                { id: 3, name: 'Tag 3', is_tag: true },
            ],
            user: {
                id: 1,
                first_name: 'Luffy',
                last_name: 'Balasi',
                avatar: 'image',
            },
        },
        {
            id: 2,
            title: 'This is a simple question title 2nd',
            content: 'This is the description of a simple question 2nd',
            created_at: '2 days ago',
            vote_count: 20,
            answer_count: 4,
            view_count: 25,
            tags: [
                { id: 1, name: 'Tag 1', is_tag: true },
                { id: 2, name: 'Tag 2', is_tag: false },
                { id: 3, name: 'Tag 3', is_tag: false },
            ],
            user: {
                id: 1,
                first_name: 'Luffy',
                last_name: 'Balasi',
                avatar: 'image',
            },
        },
    ]

    const onClickAskQuestion = (event: React.MouseEvent) => {
        event.preventDefault()

        router.push('/questions/add')
    }

    const onClickDateFilter = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    const onClickAnsweredFilter = (event: React.MouseEvent) => {
        event.preventDefault()
    }

    return (
        <div className="flex flex-col gap-4 py-8 px-10">
            <div className="flex flex-row items-center justify-between px-5">
                <Button usage="ask_question" isDisabled={false} onClick={onClickAskQuestion}>
                    Ask a Question
                </Button>
                <Filters onClickDate={onClickDateFilter} onClickAnswered={onClickAnsweredFilter} />
            </div>
            <div className="flex flex-col gap-3 divide-y-2 divide-primary-gray">
                {questionList.map(function (question) {
                    return (
                        <QuestionList
                            key={question.id}
                            id={question.id}
                            title={question.title}
                            content={question.content}
                            created_at={question.created_at}
                            vote_count={question.vote_count}
                            answer_count={question.answer_count}
                            view_count={question.view_count}
                            tags={question.tags}
                            user={question.user}
                        />
                    )
                })}
                <Paginate current={5} />
            </div>
        </div>
    )
}

export default QuestionsPage
