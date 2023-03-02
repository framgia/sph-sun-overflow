import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { HiCheck } from 'react-icons/hi2'

import { removeItemViaId } from '@/utils'
import Tag from '../../atoms/Tag'
import { UseFormSetValue } from 'react-hook-form'
import { useQuery } from '@apollo/client'
import { GET_TAG_SUGGESTIONS } from '@/helpers/graphql/queries/sidebar'
import { FormValues } from '@/components/organisms/QuestionForm'
export type ITag = {
    id: number
    name: string
    description: string
}
interface TagInputProps {
    setValue: UseFormSetValue<FormValues>
    value: ITag[]
}

const initialState = {
    tagsSelected: [] as ITag[],
    tagSuggestions: [],
    queryText: '',
}

const filterSuggest = (oldList: ITag[], newList: ITag[]) => {
    let tempSuggestions = [] as ITag[]
    newList.map((tag) => {
        if (!oldList.some((tag2) => tag2.id === tag.id)) {
            tempSuggestions.push(tag)
        }
    })
    return tempSuggestions
}

const TagsInput = ({ setValue, value }: TagInputProps) => {
    let tagsSelected: ITag[]
    let setTagsSelected: (value: ITag[]) => void
    ;[tagsSelected, setTagsSelected] = useState<ITag[]>(value)
    const [tagSuggestions, setTagSuggestions] = useState<ITag[] | []>(value)
    const [queryText, setQueryText] = useState<string>(initialState.queryText)
    let dataLoaded = false

    const { data: tagData, loading: tagLoading } = useQuery(GET_TAG_SUGGESTIONS, {
        variables: { queryString: `%${queryText}%` },
    })

    const deleteTag = (id: number): void => {
        let tempArr = removeItemViaId(tagsSelected, id)
        setTagsSelected([...tempArr])
    }

    const disableInput: boolean = tagsSelected.length < 5 ? false : true
    const filteredTags =
        queryText === ''
            ? tagSuggestions
            : tagSuggestions.filter((tag) =>
                  tag.name
                      .toLowerCase()
                      .replace(/\s+/g, '')
                      .includes(queryText.toLowerCase().replace(/\s+/g, ''))
              )

    useEffect(() => {
        setValue('tags', tagsSelected)
    }, [tagsSelected])

    useEffect(() => {
        if (!tagLoading) {
            setTagSuggestions([
                ...tagSuggestions,
                ...filterSuggest(tagSuggestions, tagData.tagSuggest),
            ])
        }
    }, [tagData])

    return (
        <div className="flex w-full flex-wrap rounded-lg border-2 border-gray-400 bg-white">
            <Combobox
                value={tagsSelected}
                onChange={setTagsSelected}
                multiple
                disabled={disableInput}
            >
                <span className="flex flex-row ">
                    {tagsSelected.map((tag, index) => {
                        let { name, id } = tag
                        return <Tag key={index} name={name} tagId={id} deleteTag={deleteTag} />
                    })}
                </span>

                <Combobox.Input
                    id="comboBoxInput"
                    className="mx-2 w-0 grow border-none text-sm leading-5 text-gray-900 focus:ring-0"
                    onChange={(event) => setQueryText(event.target.value)}
                />
                <div className="relative mt-1 w-full">
                    <Transition
                        as={Fragment}
                        show={disableInput ? false : undefined}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryText('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredTags.length === 0 && queryText !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredTags.map((tag) => (
                                    <Combobox.Option
                                        key={tag.id}
                                        className={({ active }) =>
                                            `relative z-10 cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? 'bg-teal-600 text-white'
                                                    : 'bg-white text-gray-900'
                                            }`
                                        }
                                        value={tag}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {tag.name}
                                                </span>
                                                <span className={`block truncate pl-3`}>
                                                    {tag.description}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                    >
                                                        <HiCheck
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default TagsInput
