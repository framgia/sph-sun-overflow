import PageTitle from '@/components/atoms/PageTitle'
import QuestionForm from '@/components/organisms/QuestionForm'
import { GET_TAG_SUGGESTIONS } from '@/helpers/graphql/queries/sidebar'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiArrowLeft } from 'react-icons/hi'

const QuestionFormPage = (): JSX.Element => {
    let path
    const router = useRouter()
    if (router.asPath === '/questions/add') path = '/questions'
    else path = `/teams/${router.query.prev as string}`

    const { data, loading, error, refetch } = useQuery(GET_TAG_SUGGESTIONS, {
        variables: { queryString: `%%` },
    })

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        return <></>
    }
    return (
        <>
            <PageTitle title="Add Question" />
            <div className="flex w-full flex-row justify-center gap-2.5 ">
                <Link href={path}>
                    <div className="py-4">
                        <HiArrowLeft size={24} />
                    </div>
                </Link>
                <div className="">
                    <QuestionForm refetch={refetch} tagData={data} />
                </div>
            </div>
        </>
    )
}
export default QuestionFormPage
