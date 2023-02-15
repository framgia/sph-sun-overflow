import Image from 'next/image'
import QuestionForm from '@/components/organisms/QuestionForm'
import Link from 'next/link'
const QuestionFormPage = () => {
    return (
        <div className="flex w-full flex-col content-center justify-center ">
            <div className="flex shrink pb-6">
                <div className="ml-10 pt-10 text-xl text-primary-gray">
                    <Link href="/questions">{'< Go Back'}</Link>
                </div>
            </div>
            <div className="ml-16 mr-16 w-full content-center lg:w-[80%]">
                <QuestionForm />
            </div>
        </div>
    )
}
export default QuestionFormPage
