import PageTitle from '@/components/atoms/PageTitle'
import QuestionForm from '@/components/organisms/QuestionForm'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiArrowLeft } from 'react-icons/hi'

const QuestionFormPage = (): JSX.Element => {
    let path
    const router = useRouter()
    if (router.asPath === '/questions/add') path = '/questions'
    else path = `/teams/${router.query.prev as string}`

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
                    <QuestionForm />
                </div>
            </div>
        </>
    )
}
export default QuestionFormPage
