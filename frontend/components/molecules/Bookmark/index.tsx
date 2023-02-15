import Icons from '@/components/atoms/Icons'
import { useMutation } from '@apollo/client'
import TOGGLE_BOOKMARK from '@/helpers/graphql/mutations/toggle_bookmark'
import { successNotify } from '@/helpers/toast'
import { useState } from 'react'

type BookmarkProps = {
    is_bookmarked: boolean
    bookmarkable_id: number
    bookmarkable_type: string
    refetchHandler: () => void
}

const Bookmark = ({
    is_bookmarked,
    bookmarkable_id,
    bookmarkable_type,
    refetchHandler,
}: BookmarkProps): JSX.Element => {
    const [toggleBookmark] = useMutation(TOGGLE_BOOKMARK)

    const [isBookmarked, setIsBookmarked] = useState(is_bookmarked)

    const handleClick = () => {
        toggleBookmark({
            variables: {
                bookmarkable_id,
                bookmarkable_type,
            },
        }).then((data: any) => {
            setIsBookmarked(!isBookmarked)
            successNotify(data.data.toggleBookmark)
        })

        refetchHandler()
    }

    return (
        <button
            type="button"
            className="flex cursor-pointer justify-center"
            onClick={() => handleClick()}
        >
            <Icons name={isBookmarked ? 'bookmark_fill' : 'bookmark_outline'} />
        </button>
    )
}

export default Bookmark
