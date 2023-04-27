import QuestionForm from '@/components/organisms/QuestionForm'
import GET_QUESTION_SKELETON from '@/helpers/graphql/queries/get_question_skeleton'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'

const EditQuestionFormPage = (): JSX.Element => {
    const router = useRouter()
    const query = router.query
    const { data, loading } = useQuery(GET_QUESTION_SKELETON, {
        variables: {
            slug: String(query['question-slug']),
            shouldAddViewCount: false,
        },
    })
    return (
        <div className="flex flex-col">
            <div className="w-full">
                <Link
                    href={`/teams/${query.slug as string}/question/${
                        query['question-slug'] as string
                    }`}
                >
                    <div className="flex flex-row items-center text-2xl">
                        <IoIosArrowBack size={24} /> Go Back
                    </div>
                </Link>
            </div>
            <div className="mt-[80px] flex w-full justify-center ">
                {!loading && <QuestionForm initialState={data.question} />}
            </div>
        </div>
    )
}
export default EditQuestionFormPage
