import Button from '@/components/atoms/Button'
import { ADD_WATCHED_TAG, REMOVE_WATCHED_TAG } from '@/helpers/graphql/mutations/sidebar'
import { QTagsSidebar } from '@/helpers/graphql/queries/sidebar'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { type Tab } from '@/pages/manage/users/[slug]'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

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

const TagPopover = ({ tag }: TagType): JSX.Element => {
    const router = useRouter()
    const manageUsersSelectedTab = (router.query.tab ?? 'Questions') as Tab

    const [addWatchedTagAPI] = useMutation(ADD_WATCHED_TAG, {
        refetchQueries: [
            manageUsersSelectedTab === 'Questions' ? 'Questions' : 'Answers',
            { query: QTagsSidebar },
        ],
        onCompleted: (data) => {
            if (data.addWatchedTag === 'Successfully added the tag') {
                successNotify(data.addWatchedTag)
            } else {
                errorNotify(data.addWatchedTag)
            }
        },
    })
    const [removeWatchedTagAPI] = useMutation(REMOVE_WATCHED_TAG, {
        refetchQueries: [
            manageUsersSelectedTab === 'Questions' ? 'Questions' : 'Answers',
            { query: QTagsSidebar },
        ],

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
        <div className="flex w-72 flex-col gap-2">
            <div className="min-h-[50px] border-b border-neutral-300 px-2 pb-2">
                <span className="text-[12px] text-neutral-900">{tag.description}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button
                    usage="popover"
                    onClick={() => {
                        void router.push(`/questions/tagged/${tag.slug ?? ''}`)
                    }}
                >
                    View tag
                </Button>
                <Button
                    usage="popover"
                    type="submit"
                    onClick={async () => {
                        await toggleTagWatch()
                    }}
                >
                    {`${isWatched ? 'Unwatch' : 'Watch'}`}
                </Button>
            </div>
        </div>
    )
}

export default TagPopover
