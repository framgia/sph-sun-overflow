import QuestionForm from '@/components/organisms/QuestionForm'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoIosArrowBack } from 'react-icons/io'

const QuestionFormPage = (): JSX.Element => {
    let path
    const router = useRouter()
    if (router.asPath === '/questions/add') path = '/questions'
    else path = `/teams/${router.query.prev as string}`

    return (
        <div className="flex w-full flex-col">
            <div className="w-full">
                <Link href={path}>
                    <div className="flex flex-row items-center text-2xl">
                        <IoIosArrowBack size={24} /> Go Back
                    </div>
                </Link>
            </div>
            <div className="mt-[80px] flex w-full justify-center ">
                <QuestionForm />
            </div>
        </div>
    )
}
export default QuestionFormPage
