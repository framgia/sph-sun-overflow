import { PaginatorInfo } from '@/pages/questions'
import { BookmarkType } from '@/pages/users/[slug]'
import BookmarkList from '../BookmarkList'
import Paginate from '../Paginate'

type Props = {
    bookmarks: BookmarkType[]
    pageInfo: PaginatorInfo
    onPageChange: (first: number, page: number) => void
}

const BookmarkTabContent = ({ bookmarks, pageInfo, onPageChange }: Props): JSX.Element => {
    return (
        <div className={`flex w-full flex-col ${bookmarks.length > 0 && 'pr-52'}`}>
            <div className="flex w-full flex-col gap-3 divide-y-2 divide-primary-gray pl-3">
                {bookmarks.length > 0 ? (
                    bookmarks.map((bookmark, index) => (
                        <BookmarkList
                            key={index}
                            id={bookmark.id}
                            bookmarkable={bookmark.bookmarkable}
                            user={bookmark.user}
                        />
                    ))
                ) : (
                    <BookmarkList />
                )}
            </div>
            {pageInfo.lastPage > 1 && <Paginate {...pageInfo} onPageChange={onPageChange} />}
        </div>
    )
}

export default BookmarkTabContent
