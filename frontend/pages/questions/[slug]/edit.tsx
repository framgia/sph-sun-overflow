import QuestionForm from '@/components/organisms/QuestionForm'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import GET_QUESTION_SKELETON from '@/helpers/graphql/queries/get_question_skeleton'

const EditQuestionFormPage = () => {
    const router = useRouter()
    const slug = router.query.slug
    const { data, loading } = useQuery(GET_QUESTION_SKELETON, {
        variables: {
            slug: String(slug),
            shouldAddViewCount: false,
        },
    })
    return (
        <div className="flex w-full flex-col content-center justify-center ">
            <div className="flex shrink pb-6">
                <div className="ml-10 pt-10 text-xl text-primary-gray">
                    <Link href={`/questions/${router.query.slug}`}>{'< Go Back'}</Link>
                </div>
            </div>
            <div className="ml-16 mr-16 w-full content-center lg:w-[80%]">
                {!loading && <QuestionForm initialState={data?.question} />}
            </div>
        </div>
    )
}
export default EditQuestionFormPage
