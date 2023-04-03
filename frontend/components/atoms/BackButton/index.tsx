import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi'

type Props = {
    path: string
}

const BackButton = ({ path }: Props): JSX.Element => {
    return (
        <Link href={path} className="flex w-fit items-center text-gray-500 hover:text-primary-red">
            <HiChevronLeft className="mr-1 text-xl" />
            Back
        </Link>
    )
}

export default BackButton
