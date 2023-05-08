import QuestionForm from '@/components/organisms/QuestionForm'
import GET_QUESTION_SKELETON from '@/helpers/graphql/queries/get_question_skeleton'
import { GET_TAG_SUGGESTIONS } from '@/helpers/graphql/queries/sidebar'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiArrowLeft } from 'react-icons/hi'

const EditQuestionFormPage = (): JSX.Element => {
    const router = useRouter()
    const query = router.query

    const { data, loading, error } = useQuery(GET_QUESTION_SKELETON, {
        variables: {
            slug: String(query['question-slug']),
            shouldAddViewCount: false,
        },
    })
    const {
        data: tagData,
        loading: tagLoading,
        error: tagError,
        refetch,
    } = useQuery(GET_TAG_SUGGESTIONS, {
        variables: { queryString: `%%` },
    })

    if (loading || tagLoading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error?.message ?? ''}`)
        void router.push('/404')
        return loadingScreenShow()
    }
    if (tagError) {
        errorNotify(`Error! ${tagError?.message ?? ''}`)
        void router.push('/404')
        return loadingScreenShow()
    }
    return (
        <div className="flex w-full flex-row justify-center gap-2.5 ">
            <Link
                href={`/teams/${query.slug as string}/question/${query['question-slug'] as string}`}
            >
                <div className="py-4">
                    <HiArrowLeft size={24} />
                </div>
            </Link>
            <div className="">
                {!loading && (
                    <QuestionForm
                        initialState={data.question}
                        refetch={refetch}
                        tagData={tagData}
                    />
                )}
            </div>
        </div>
    )
}
export default EditQuestionFormPage
