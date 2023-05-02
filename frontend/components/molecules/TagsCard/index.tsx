import Button from '@/components/atoms/Button'
import { CustomIcons } from '@/components/atoms/Icons'
import { ADD_WATCHED_TAG, REMOVE_WATCHED_TAG } from '@/helpers/graphql/mutations/sidebar'
import { QTagsSidebar } from '@/helpers/graphql/queries/sidebar'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import Link from 'next/link'

const { EyeIcon } = CustomIcons

type TagsCardProps = {
    id: number
    slug: string
    name: string
    description: string
    questionsCount: number
    watchersCount: number
}

const TagsCard = ({
    id,
    slug,
    name,
    description,
    questionsCount,
    watchersCount,
}: TagsCardProps): JSX.Element => {
    const [addWatchedTagAPI] = useMutation(ADD_WATCHED_TAG, {
        refetchQueries: ['Tags', { query: QTagsSidebar }],
        onCompleted: (data) => {
            if (data.addWatchedTag === 'Successfully added the tag') {
                successNotify(data.addWatchedTag)
            } else {
                errorNotify(data.addWatchedTag)
            }
        },
    })
    const [removeWatchedTagAPI] = useMutation(REMOVE_WATCHED_TAG, {
        refetchQueries: ['Tags', { query: QTagsSidebar }],

        onCompleted: (data) => {
            if (data.removeWatchedTag === 'Successfully removed tag from WatchList') {
                successNotify(data.removeWatchedTag)
            } else {
                errorNotify(data.removeWatchedTag)
            }
        },
    })

    const watchedTags = useBoundStore((state) => state.watchedTags)
    const isWatched = watchedTags.some((tempTag) => tempTag.name === name)

    const toggleTagWatch = async (): Promise<void> => {
        if (isWatched) await removeWatchedTagAPI({ variables: { tagId: id } })
        else await addWatchedTagAPI({ variables: { tagId: id } })
    }

    return (
        <Link href={`questions/tagged/${slug}`}>
            <div className="group flex h-[200px] flex-col rounded-[5px] border border-neutral-200 text-neutral-900">
                <div className="flex justify-center gap-1 truncate bg-primary-200 p-2 text-center text-sm font-semibold group-hover:text-primary-base">
                    {isWatched && (
                        <div className="pt-[2px]">
                            <EyeIcon height={16} width={16} />
                        </div>
                    )}
                    <span title={name}>{name}</span>
                </div>
                <div className="flex h-full flex-col items-center justify-between p-4">
                    <p className=" break-all px-4 text-center text-xs line-clamp-4">
                        {description}
                    </p>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-4 text-neutral-disabled">
                            <span className="text-xs">
                                {questionsCount} {questionsCount === 1 ? 'question' : 'questions'}
                            </span>
                            <span className="text-xs">
                                {watchersCount} {watchersCount === 1 ? 'watcher' : 'watchers'}
                            </span>
                        </div>
                        <Button
                            usage="popover"
                            type="submit"
                            onClick={async (e) => {
                                e.preventDefault()
                                await toggleTagWatch()
                            }}
                        >
                            {`${isWatched ? 'Unwatch' : 'Watch'}`}
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TagsCard
