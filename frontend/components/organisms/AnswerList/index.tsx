import AnswerDetail from '@/components/organisms/AnswerDetail'
import ContentCard from '@/components/templates/ContentCard'
import { type AnswerType } from '@/pages/questions/[slug]'
import AnswerForm from '../AnswerForm'

type Props = {
    question_id: number
    question_is_from_user: boolean
    is_answered: boolean
    answers: AnswerType[]
    slug: string
    refetchHandler: () => void
}

const AnswerList = ({
    question_id,
    question_is_from_user,
    is_answered,
    answers,
    slug,
    refetchHandler,
}: Props): JSX.Element => {
    return (
        <ContentCard header="Answers">
            <div className="flex w-full flex-col">
                {answers.map((answer, index) => (
                    <div key={index} className="w-full border-b border-neutral-200">
                        <AnswerDetail
                            id={answer.id}
                            question_id={question_id}
                            content={answer.content}
                            created_at={answer.humanized_created_at}
                            vote_count={answer.vote_count}
                            is_bookmarked={answer.is_bookmarked}
                            is_correct={answer.is_correct}
                            user={answer.user}
                            is_created_by_user={answer.is_created_by_user}
                            comments={answer.comments}
                            question_is_from_user={question_is_from_user}
                            answer_is_from_user={answer.is_from_user}
                            is_answered={is_answered}
                            user_vote={answer.user_vote}
                            refetchHandler={refetchHandler}
                        />
                    </div>
                ))}
                <AnswerForm slug={slug} question_id={question_id} refetchHandler={refetchHandler} />
            </div>
        </ContentCard>
    )
}
export default AnswerList
