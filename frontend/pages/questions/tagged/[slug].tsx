import { QuestionType } from '../[slug]'
import QuestionList from '@/components/organisms/QuestionList'
import DropdownFilters from '@/components/molecules/DropdownFilters'

const TagsPage = () => {
    const questions: QuestionType[] = [
        {
            id: 1,
            slug: 'question-1',
            title: 'Question 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            answers: [],
            comments: [],
            created_at: '02-16-2023',
            humanized_created_at: '1 hour ago',
            is_answered: false,
            is_bookmarked: false,
            is_from_user: false,
            tags: [
                {
                    id: 1,
                    name: 'JavaScript',
                    is_watched_by_user: true,
                },
                {
                    id: 2,
                    name: 'Python',
                    is_watched_by_user: false,
                },
                {
                    id: 3,
                    name: 'PHP',
                    is_watched_by_user: false,
                },
            ],
            user: {
                id: 1,
                first_name: 'John',
                last_name: 'Smith',
            },
            user_vote: 0,
            views_count: 30,
            vote_count: 10,
        },
        {
            id: 2,
            slug: 'question-2',
            title: 'Question 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            answers: [],
            comments: [],
            created_at: '02-16-2023',
            humanized_created_at: '2 hours ago',
            is_answered: false,
            is_bookmarked: false,
            is_from_user: false,
            tags: [
                {
                    id: 1,
                    name: 'Next.js',
                    is_watched_by_user: false,
                },
                {
                    id: 2,
                    name: 'TypeScript',
                    is_watched_by_user: true,
                },
            ],
            user: {
                id: 1,
                first_name: 'Jane',
                last_name: 'Doe',
            },
            user_vote: 0,
            views_count: 15,
            vote_count: 5,
        },
    ]

    return (
        <div className="w-full px-8 py-8">
            <h1 className="mb-6 text-2xl font-bold">
                Questions tagged with <span className="text-primary-red">Tag</span>
            </h1>
            <hr className="mb-4 h-[1px] border-none bg-secondary-black" />
            <div className="mb-2 flex justify-end gap-2">
                <DropdownFilters
                    triggers={['DATE', 'ANSWER']}
                    refetch={() => console.log('refetch')}
                />
            </div>
            <div className="flex flex-col divide-y-2">
                {questions.map((question) => (
                    <QuestionList
                        key={question.id}
                        id={question.id}
                        title={question.title}
                        slug={question.slug}
                        content={question.content}
                        created_at={question.created_at}
                        humanized_created_at={question.humanized_created_at}
                        vote_count={question.vote_count}
                        answer_count={question.answers.length}
                        view_count={question.views_count}
                        tags={question.tags}
                        user={question.user}
                    />
                ))}
            </div>
        </div>
    )
}

export default TagsPage
