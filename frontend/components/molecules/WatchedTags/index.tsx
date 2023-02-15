import { useEffect, useState, useRef } from 'react'
import { removeItemViaId } from '@/utils'
import { HiPencil, HiX } from 'react-icons/hi'
import CustomCombobox from '@/components/molecules/CustomComboBox'
import Link from 'next/link'
import { useMutation, useQuery } from '@apollo/client'
import { GET_TAG_SUGGESTIONS, LOAD_SIDEBAR_1 } from '@/helpers/graphql/queries/sidebar'
import { ADD_WATCHED_TAG, REMOVE_WATCHED_TAG } from '@/helpers/graphql/mutations/sidebar'
import { errorNotify, successNotify } from '@/helpers/toast'

type TTag = {
    id: number
    name: string
    description: string
}
interface WatchedTagsProps {
    loading: boolean
    data: {
        me: { watchedTags: TTag[] }
    }
}

const WatchedTags = ({ data, loading = true }: WatchedTagsProps) => {
    const detectorRef = useRef(null)
    const [watchedTags, setWatchedTags] = useState<TTag[]>([])
    const [viewAdd, setViewAdd] = useState(false)
    const [queryText, setQueryText] = useState<string>('')
    const [tagSuggestions, setTagSuggestions] = useState<TTag[]>([])

    const { data: tagData, loading: tagLoading } = useQuery(GET_TAG_SUGGESTIONS, {
        variables: { queryString: `%${queryText}%` },
    })
    const [addWatchedTagAPI] = useMutation(ADD_WATCHED_TAG, {
        refetchQueries: [{ query: LOAD_SIDEBAR_1 }, 'LoadSidebar1'],
        onCompleted: (data) => {
            if (data.addWatchedTag == 'Successfully added the tag') {
                successNotify(data.addWatchedTag)
            } else {
                errorNotify(data.addWatchedTag)
            }
        },
    })
    const [removeWatchedTagAPI] = useMutation(REMOVE_WATCHED_TAG, {
        refetchQueries: [{ query: LOAD_SIDEBAR_1 }, 'LoadSidebar1'],
        onCompleted: (data) => {
            if (data.removeWatchedTag == 'Successfully removed tag from WatchList') {
                successNotify(data.removeWatchedTag)
            } else {
                errorNotify(data.removeWatchedTag)
            }
        },
    })

    useEffect(() => {
        if (!tagLoading) {
            setTagSuggestions(tagData.tagSuggest)
        }
    }, [tagData])
    useEffect(() => {
        if (!loading) {
            setWatchedTags(data.me.watchedTags)
        }
    }, [data])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside, true)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true)
        }
    }, [])

    const handleClickOutside = (event: MouseEvent) => {
        if (detectorRef.current && !detectorRef.current.contains(event.target)) {
            setViewAdd(false)
            setQueryText('')
        }
    }

    const isVisible = viewAdd ? 'flex' : 'hidden'
    const toggleVisible = () => {
        setViewAdd(!viewAdd)
    }

    const handleSubmit = async (tagVal: any) => {
        addWatchedTagAPI({ variables: { tagId: tagVal.id } })
        setViewAdd(false)
    }

    const removeWatchedTag = (id: number): void => {
        removeWatchedTagAPI({ variables: { tagId: id } })
        let TempTagList = removeItemViaId(watchedTags, id)
        setWatchedTags([...TempTagList])
    }

    return (
        <div className="z-10 m-3 mb-0 p-1 drop-shadow-md" ref={detectorRef}>
            <div className="flex w-full justify-between rounded-tr-xl rounded-tl-xl bg-[#E8E8E8] p-4 drop-shadow-md">
                <span className="align-left text-xl font-medium">Watched Tags</span>
                <div className="">
                    <HiPencil className="cursor-pointer text-2xl" onClick={toggleVisible} />
                </div>
            </div>
            <div className="rounded-br-xl rounded-bl-xl bg-white">
                {loading && <div className="animate-spin"></div>}
                <div className={`tags flex flex-wrap rounded-br-xl rounded-bl-xl bg-white p-4 `}>
                    {loading && (
                        <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg>
                    )}
                    {!loading &&
                        watchedTags.length > 0 &&
                        watchedTags.map((tag, index) => {
                            return (
                                <div
                                    key={index}
                                    className="max-w-20 text-overflow-ellipsis mx-0.5 my-1 flex items-center overflow-hidden rounded-2xl bg-red-300 py-0.5 px-1"
                                >
                                    <Link
                                        className="label px-2 py-1 text-xs"
                                        href={`/tags/${tag.id}`}
                                    >
                                        {tag.name}
                                    </Link>
                                    <HiX
                                        className="bg cursor-pointer rounded-xl hover:bg-black hover:text-white"
                                        onClick={() => {
                                            removeWatchedTag(tag.id)
                                        }}
                                    />
                                </div>
                            )
                        })}
                    {!loading && watchedTags.length == 0 && (
                        <div className="text-md w-full bg-white text-center font-medium">
                            No watched tags
                        </div>
                    )}
                </div>
                <div className={`${isVisible} w-full p-1 `}>
                    <CustomCombobox
                        setValue={handleSubmit}
                        hasBtn={true}
                        btnName="Add"
                        placeholder="Insert Tag"
                        extraInputClasses=" rounded-tl-xl rounded-bl-xl border-[1px] border-r-0 border-black"
                        extraBtnClasses="flex border-[1px] border-black bg-primary-red text-white items-center h-full -mr-1 px-4 hover:bg-secondary-red cursor-pointer rounded-tr-xl rounded-br-xl "
                        suggestionProps={tagSuggestions}
                        queryText={queryText}
                        setQueryText={setQueryText}
                    />
                </div>
            </div>
        </div>
    )
}

export default WatchedTags
