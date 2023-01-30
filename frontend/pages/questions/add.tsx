import Image from 'next/image'
import QuestionForm from '@/components/organisms/QuestionForm'
import Link from 'next/link'
const QuestionFormPage = () => {
    return (
        <div className="flex flex-col justify-center content-center ">
            <div className="flex shrink pb-6">
                <div className="text-primary-gray text-xl ml-10 pt-10">
                    <Link href="/questions">{'< Go Back'}</Link>
                </div>
            </div>
            <div className="w-full content-center ml-16 lg:w-[80%] mr-16">
                <QuestionForm />
            </div>
        </div>
    )
}
export default QuestionFormPage
