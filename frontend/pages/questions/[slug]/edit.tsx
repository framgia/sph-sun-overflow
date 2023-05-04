import QuestionForm from '@/components/organisms/QuestionForm'
import GET_QUESTION_SKELETON from '@/helpers/graphql/queries/get_question_skeleton'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiArrowLeft } from 'react-icons/hi'

const EditQuestionFormPage = (): JSX.Element => {
    const router = useRouter()
    const slug = router.query.slug
    const { data, loading, error } = useQuery(GET_QUESTION_SKELETON, {
        variables: {
            slug: String(slug),
            shouldAddViewCount: false,
        },
    })

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error?.message ?? ''}`)
        void router.push('/404')
        return loadingScreenShow()
    }

    return (
        <div className="flex w-full flex-row justify-center gap-2.5 ">
            <Link href={`/questions/${router.query.slug as string}`}>
                <div className="py-4">
                    <HiArrowLeft size={24} />
                </div>
            </Link>
            <div className="">
                <QuestionForm initialState={data?.question} />
            </div>
        </div>
    )
}
export default EditQuestionFormPage
