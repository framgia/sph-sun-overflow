import QuestionForm from '@/components/organisms/QuestionForm'
import GET_QUESTION_SKELETON from '@/helpers/graphql/queries/get_question_skeleton'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

const EditQuestionFormPage = () => {
    const router = useRouter()
    const query = router.query
    const { data, loading } = useQuery(GET_QUESTION_SKELETON, {
        variables: {
            slug: String(query['question-slug']),
            shouldAddViewCount: false,
        },
    })
    return (
        <div className="flex w-full flex-col content-center justify-center ">
            <div className="flex shrink pb-6">
                <div className="ml-10 pt-10 text-xl text-primary-gray">
                    <Link href={`/teams/${query['slug']}/question/${query['question-slug']}`}>
                        {'< Go Back'}
                    </Link>
                </div>
            </div>
            <div className="ml-16 mr-16 w-full content-center lg:w-[80%]">
                {!loading && <QuestionForm initialState={data.question} />}
            </div>
        </div>
    )
}
export default EditQuestionFormPage
