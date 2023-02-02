import Link from 'next/link'

type Props = {
    text: string
    author: string
}

const Comment = ({ text, author }: Props) => {
    return (
        <div className="group flex flex-wrap gap-2 border-b-2 p-2">
            <span>{text}</span>
            <span>–</span>
            <span>
                <Link href="#" className="text-blue-500 hover:text-blue-400">
                    {author}
                </Link>
            </span>
            <span className="text-primary-gray">6 mins ago</span>
            <div className="invisible flex gap-2 group-hover:visible">
                <span>
                    <Link href="#" className="text-blue-500 hover:text-blue-400">
                        Edit
                    </Link>
                </span>
                <span>
                    <Link href="#" className="text-primary-red hover:text-secondary-red">
                        Delete
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Comment
