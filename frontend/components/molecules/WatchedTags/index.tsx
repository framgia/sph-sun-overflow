import CustomCombobox from '@/components/molecules/CustomComboBox'
import { ADD_WATCHED_TAG, REMOVE_WATCHED_TAG } from '@/helpers/graphql/mutations/sidebar'
import { GET_TAG_SUGGESTIONS, QTagsSidebar } from '@/helpers/graphql/queries/sidebar'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { HiOutlinePencilAlt, HiX } from 'react-icons/hi'

type TTag = {
    id: number
    name: string
    description: string
    slug: string
}
interface WatchedTagsProps {
    watchedTags: TTag[]
}

const WatchedTags = ({ watchedTags }: WatchedTagsProps): JSX.Element => {
    const detectorRef = useRef<HTMLDivElement>(null)
    const [canEdit, setCanEdit] = useState(false)
    const [queryText, setQueryText] = useState<string>('')
    const [tagSuggestions, setTagSuggestions] = useState<TTag[]>([])

    const { data: tagData, loading: tagLoading } = useQuery(GET_TAG_SUGGESTIONS, {
        variables: { queryString: `%${queryText}%` },
    })
    const [addWatchedTagAPI] = useMutation(ADD_WATCHED_TAG, {
        refetchQueries: ['Questions', { query: QTagsSidebar }],
        onCompleted: (data) => {
            if (data.addWatchedTag === 'Successfully added the tag') {
                successNotify(data.addWatchedTag)
            } else {
                errorNotify(data.addWatchedTag)
            }
        },
    })
    const [removeWatchedTagAPI] = useMutation(REMOVE_WATCHED_TAG, {
        refetchQueries: ['Questions', { query: QTagsSidebar }],
        onCompleted: (data) => {
            if (data.removeWatchedTag === 'Successfully removed tag from WatchList') {
                successNotify(data.removeWatchedTag)
            } else {
                errorNotify(data.removeWatchedTag)
            }
        },
    })

    useEffect(() => {
        if (!tagLoading) {
            setTagSuggestions(tagData?.tagSuggest)
        }
    }, [tagData, tagLoading])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true)
        }
    }, [])

    const handleClickOutside = (event: MouseEvent): void => {
        if (detectorRef.current && !detectorRef.current.contains(event.target as Node)) {
            setCanEdit(false)
            setQueryText('')
        }
    }

    const toggleVisible = (): void => {
        setCanEdit(!canEdit)
    }

    const handleSubmit = async (tagVal: any): Promise<void> => {
        await addWatchedTagAPI({ variables: { tagId: tagVal.id } })
    }

    const removeWatchedTag = async (id: number): Promise<void> => {
        await removeWatchedTagAPI({ variables: { tagId: id } })
    }

    return (
        <div className="z-10 mb-0 rounded-smd drop-shadow-xsm" ref={detectorRef}>
            <div className="flex h-12 w-full items-center justify-between rounded-t-smd border-x border-t border-neutral-200 bg-primary-200 p-4 text-neutral-900">
                <span className="align-left h-fit align-middle text-sm font-semibold">
                    Watched Tags
                </span>
                <HiOutlinePencilAlt className="cursor-pointer text-xl" onClick={toggleVisible} />
            </div>
            <div className="flex flex-col gap-4 rounded-b-smd border-x border-b border-neutral-200 bg-white p-4">
                <div
                    className={`tags no-scrollbar flex max-h-36 flex-wrap gap-2 overflow-y-scroll`}
                >
                    {watchedTags.length > 0 &&
                        watchedTags.map((tag, index) => {
                            return (
                                <div
                                    key={index}
                                    className="max-w-20 flex items-center overflow-hidden text-ellipsis rounded-2xl bg-red-300 px-1 py-0.5"
                                >
                                    <Link
                                        className="label px-2 py-1 text-xs text-white"
                                        href={`/questions/tagged/${tag.slug}`}
                                    >
                                        {tag.name}
                                    </Link>
                                    {canEdit && (
                                        <HiX
                                            className="bg cursor-pointer rounded-xl text-white hover:bg-black"
                                            onClick={async () => {
                                                await removeWatchedTag(tag.id)
                                            }}
                                        />
                                    )}
                                </div>
                            )
                        })}
                    {watchedTags.length === 0 && (
                        <div className="w-full bg-white text-center text-sm font-medium text-neutral-disabled">
                            No watched tags
                        </div>
                    )}
                </div>
                {canEdit && (
                    <div className={`flex w-full w-full`}>
                        <CustomCombobox
                            setValue={handleSubmit}
                            hasBtn={false}
                            placeholder="Insert Tag"
                            extraInputClasses="rounded-smd border border-neutral-disabled placeholder-neutral-disabled"
                            extraBtnClasses="flex border border-neutral-disabled bg-primary-red text-white items-center h-full -mr-1 hover:bg-secondary-red cursor-pointer rounded-tr-xl rounded-br-xl "
                            suggestionProps={tagSuggestions}
                            queryText={queryText}
                            setQueryText={setQueryText}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchedTags
