import Icons from '@/components/atoms/Icons'
import TOGGLE_BOOKMARK from '@/helpers/graphql/mutations/toggle_bookmark'
import GET_BOOKMARKS from '@/helpers/graphql/queries/get_bookmarks'
import { successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'

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
    const [toggleBookmark] = useMutation(TOGGLE_BOOKMARK, {
        refetchQueries: [{ query: GET_BOOKMARKS }, 'Bookmarks'],
    })

    const handleClick = (): void => {
        toggleBookmark({
            variables: {
                bookmarkable_id,
                bookmarkable_type,
            },
        })
            .then((data: any) => {
                successNotify(data.data.toggleBookmark)
            })
            .catch(() => {})

        refetchHandler()
    }

    return (
        <button
            type="button"
            className="flex cursor-pointer justify-center"
            onClick={() => {
                handleClick()
            }}
        >
            <Icons name={is_bookmarked ? 'bookmark_fill' : 'bookmark_outline'} />
        </button>
    )
}

export default Bookmark
