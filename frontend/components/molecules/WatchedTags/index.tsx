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
            console.log('outside')
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
        <div className="p-1 m-3 mb-0 drop-shadow-md z-10" ref={detectorRef}>
            <div className="flex justify-between p-4 bg-[#E8E8E8] w-full rounded-tr-xl rounded-tl-xl drop-shadow-md">
                <span className="align-left text-xl font-medium">Watched Tags</span>
                <div className="">
                    <HiPencil className="text-2xl cursor-pointer" onClick={toggleVisible} />
                </div>
            </div>
            <div className="bg-white rounded-br-xl rounded-bl-xl">
                {loading && <div className="animate-spin"></div>}
                <div className={`tags flex flex-wrap p-4 rounded-br-xl rounded-bl-xl bg-white `}>
                    {loading && (
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                    )}
                    {!loading &&
                        watchedTags.length > 0 &&
                        watchedTags.map((tag, index) => {
                            return (
                                <div
                                    key={index}
                                    className="py-0.5 px-1 mx-0.5 my-1 flex items-center max-w-20 overflow-hidden text-overflow-ellipsis bg-red-400 rounded-2xl"
                                >
                                    <Link className="label px-1 text-sm" href={`/tags/${tag.id}`}>
                                        {tag.name}
                                    </Link>
                                    <HiX
                                        className="rounded-xl bg hover:bg-black hover:text-white cursor-pointer"
                                        onClick={() => {
                                            removeWatchedTag(tag.id)
                                        }}
                                    />
                                </div>
                            )
                        })}
                    {!loading && watchedTags.length == 0 && (
                        <div className="text-center bg-white w-full text-xl font-medium">
                            No Watched Tags
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
