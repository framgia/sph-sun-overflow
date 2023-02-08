import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { useBoundStore } from '../../../helpers/store'

dayjs().format()

type Props = {
    text: string
    author: string
    time: string
    userId: number
}

const Comment = ({ text, author, time, userId }: Props) => {
    dayjs.extend(relativeTime)

    const currentUserId = useBoundStore.getState().user_id

    return (
        <div className="group flex flex-wrap gap-2 px-2 py-4">
            <span className="mr-4">{text}</span>
            <span>
                <Link href="#" className="text-blue-500 hover:text-blue-400">
                    {author}
                </Link>
            </span>
            <span className="text-primary-gray">{dayjs(time).fromNow()}</span>
            {currentUserId === userId && (
                <div className="invisible ml-2 flex gap-2 group-hover:visible">
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
            )}
        </div>
    )
}

export default Comment
