import Button from '@/components/atoms/Button'
import { ADD_WATCHED_TAG, REMOVE_WATCHED_TAG } from '@/helpers/graphql/mutations/sidebar'
import { QTagsSidebar } from '@/helpers/graphql/queries/sidebar'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import Link from 'next/link'

type TagType = {
    tag: {
        id: number
        slug?: string | null
        name: string
        description?: string | null
        is_watched_by_user: boolean
        count_tagged_questions?: number | null
        count_watching_users?: number | null
    }
}

const Tooltips = ({ tag }: TagType): JSX.Element => {
    const [addWatchedTagAPI] = useMutation(ADD_WATCHED_TAG, {
        refetchQueries: [{ query: QTagsSidebar }],
        onCompleted: (data) => {
            if (data.addWatchedTag === 'Successfully added the tag') {
                successNotify(data.addWatchedTag)
            } else {
                errorNotify(data.addWatchedTag)
            }
        },
    })
    const [removeWatchedTagAPI] = useMutation(REMOVE_WATCHED_TAG, {
        refetchQueries: [{ query: QTagsSidebar }],

        onCompleted: (data) => {
            if (data.removeWatchedTag === 'Successfully removed tag from WatchList') {
                successNotify(data.removeWatchedTag)
            } else {
                errorNotify(data.removeWatchedTag)
            }
        },
    })

    const watchedTags = useBoundStore((state) => state.watchedTags)
    const isWatched = watchedTags.some((tempTag) => tempTag.name === tag.name)

    const toggleTagWatch = async (): Promise<void> => {
        if (isWatched) await removeWatchedTagAPI({ variables: { tagId: tag.id } })
        else await addWatchedTagAPI({ variables: { tagId: tag.id } })
    }

    return (
        <div className="cursor-default font-normal">
            <div className="flex items-center">
                <span className="mr-20 text-red-700">
                    {tag.count_watching_users}{' '}
                    {(tag.count_watching_users as number) !== 1 ? `Watchers` : `Watcher`}
                </span>
                <span className="mr-2">
                    {tag.count_tagged_questions}{' '}
                    {(tag.count_tagged_questions as number) !== 1 ? `Questions` : `Question`}
                </span>
            </div>
            <div className="py-2">
                <span>
                    {tag.description}
                    <Link
                        href={`/questions/tagged/${tag.slug ?? ''}`}
                        className="ml-2 text-blue-500 underline hover:text-blue-400"
                    >
                        View Tag
                    </Link>
                </span>
            </div>
            <div className="float-right p-2">
                <Button
                    usage="popover"
                    type="submit"
                    onClick={async () => {
                        await toggleTagWatch()
                    }}
                >
                    {`${isWatched ? 'Unwatch' : 'Watch'} Tag`}
                </Button>
            </div>
        </div>
    )
}

export default Tooltips
