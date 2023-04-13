import CustomCombobox from '@/components/molecules/CustomComboBox'
import { ADD_WATCHED_TAG, REMOVE_WATCHED_TAG } from '@/helpers/graphql/mutations/sidebar'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { GET_TAG_SUGGESTIONS, QTagsSidebar } from '@/helpers/graphql/queries/sidebar'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { HiPencil, HiX } from 'react-icons/hi'

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
        refetchQueries: [{ query: QTagsSidebar }, { query: GET_QUESTIONS }],
        onCompleted: (data) => {
            if (data.addWatchedTag === 'Successfully added the tag') {
                successNotify(data.addWatchedTag)
            } else {
                errorNotify(data.addWatchedTag)
            }
        },
    })
    const [removeWatchedTagAPI] = useMutation(REMOVE_WATCHED_TAG, {
        refetchQueries: [{ query: QTagsSidebar }, { query: GET_QUESTIONS }],
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

    const isVisible = canEdit ? 'flex' : 'hidden'
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
        <div className="z-10 mb-0 drop-shadow-md" ref={detectorRef}>
            <div className="flex w-full justify-between rounded-tr-md rounded-tl-md bg-primary-red p-2.5 text-white drop-shadow-md">
                <span className="align-left text-md">Watched Tags</span>
                <HiPencil className="cursor-pointer text-xl" onClick={toggleVisible} />
            </div>
            <div className="rounded-br-xl rounded-bl-xl bg-white">
                <div
                    className={`tags no-scrollbar flex max-h-36 flex-wrap overflow-y-scroll rounded-br-md rounded-bl-md bg-white p-4`}
                >
                    {watchedTags.length > 0 &&
                        watchedTags.map((tag, index) => {
                            return (
                                <div
                                    key={index}
                                    className="max-w-20 mx-0.5 my-1 flex items-center overflow-hidden text-ellipsis rounded-2xl bg-red-300 py-0.5 px-1"
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
                        <div className="text-md w-full bg-white text-center font-medium">
                            No watched tags
                        </div>
                    )}
                </div>
                {canEdit && (
                    <div className={` w-full p-1`}>
                        <CustomCombobox
                            setValue={handleSubmit}
                            hasBtn={false}
                            placeholder="Insert Tag"
                            extraInputClasses=" rounded-xl border border-black"
                            extraBtnClasses="flex border-[1px] border-black bg-primary-red text-white items-center h-full -mr-1 px-4 hover:bg-secondary-red cursor-pointer rounded-tr-xl rounded-br-xl "
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
