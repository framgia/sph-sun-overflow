import Icons from '@/components/atoms/Icons'
import { useMutation } from '@apollo/client'
import TOGGLE_BOOKMARK from '@/helpers/graphql/mutations/toggle_bookmark'
import { successNotify } from '@/helpers/toast'
import { useState } from 'react'

type BookmarkProps = {
    is_bookmarked: boolean
    bookmarkable_id: number
    bookmarkable_type: string
}

const Bookmark = ({
    is_bookmarked,
    bookmarkable_id,
    bookmarkable_type,
}: BookmarkProps): JSX.Element => {
    const [toggleBookmark] = useMutation(TOGGLE_BOOKMARK)

    const [isBookmarked, setIsBookmarked] = useState(is_bookmarked)

    const handleClick = (bookmarkable_id: number, bookmarkable_type: string) => {
        toggleBookmark({
            variables: {
                bookmarkable_id,
                bookmarkable_type,
            },
        }).then((data: any) => {
            setIsBookmarked(!isBookmarked)
            successNotify(data.data.toggleBookmark)
        })
    }

    return (
        <button
            type="button"
            className="flex cursor-pointer justify-center"
            onClick={() => handleClick(bookmarkable_id, bookmarkable_type)}
        >
            <Icons name={isBookmarked ? 'bookmark_fill' : 'bookmark_outline'} />
        </button>
    )
}

export default Bookmark
