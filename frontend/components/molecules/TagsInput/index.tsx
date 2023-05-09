import type { FormValues } from '@/components/organisms/QuestionForm'
import { removeItemViaId } from '@/utils'
import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import { HiX } from 'react-icons/hi'
import { HiCheck } from 'react-icons/hi2'

export type ITag = {
    id: number
    name: string
    description: string
    slug: string
}
interface TagInputProps {
    setValue: UseFormSetValue<FormValues>
    value: ITag[]
    suggestions: ITag[]
    refetchSuggestions: (arg0: string) => void
}

const initialState = {
    tagsSelected: [] as ITag[],
    tagSuggestions: [],
    queryText: '',
}

const TagsInput = ({
    setValue,
    value,
    suggestions,
    refetchSuggestions,
}: TagInputProps): JSX.Element => {
    const [tagsSelected, setTagsSelected] = useState<ITag[]>(value)
    const [queryText, setQueryText] = useState<string>(initialState.queryText)

    useEffect(() => {
        const timeout = setTimeout(() => {
            refetchSuggestions(queryText)
        }, 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, [queryText])

    const deleteTag = (id: number): void => {
        const tempArr = removeItemViaId(tagsSelected, id)
        setTagsSelected([...tempArr])
    }

    const disableInput = tagsSelected.length >= 5
    const filteredTags = suggestions.filter(
        (tag) => !tagsSelected.some((selectedTag) => selectedTag.id === tag.id)
    )

    useEffect(() => {
        if (tagsSelected.length > 5) {
            setTagsSelected(tagsSelected.slice(0, 5))
        }
        setValue('tags', tagsSelected)
    }, [tagsSelected])

    useEffect(() => {
        const updatedSelectedTags = tagsSelected.map((selectedTag) => {
            const matchingFetchedTag = suggestions.find(
                (fetchedTag) => fetchedTag.id === selectedTag.id
            )
            return matchingFetchedTag ?? selectedTag
        })
        setTagsSelected(updatedSelectedTags)
    }, [suggestions])

    return (
        <div className="flex w-full flex-wrap rounded-lg border border-[#EEEEEE] bg-white focus-within:ring-2 focus-within:ring-blue-500 ">
            <Combobox
                value={tagsSelected}
                onChange={(e) => {
                    setTagsSelected(e)
                }}
                multiple
                disabled={disableInput}
            >
                <div className="mx-1 mt-1 flex h-[34px] w-full flex-row flex-wrap gap-x-0.5 gap-y-1">
                    {tagsSelected.map((tag, index) => {
                        const { name, id } = tag
                        return (
                            <div
                                key={id}
                                className="max-w-20 mx-0.5 my-auto flex flex-wrap items-center gap-0.5 overflow-hidden text-ellipsis rounded-2xl bg-neutral-200 px-1 py-0.5  text-neutral-900"
                            >
                                <div className="label text-[10px] ">{name}</div>
                                <HiX
                                    className="bg cursor-pointer rounded-xl hover:text-primary-red"
                                    onClick={() => {
                                        deleteTag(id)
                                    }}
                                />
                            </div>
                        )
                    })}
                    {tagsSelected.length < 5 && (
                        <div className="flex min-w-0  flex-grow">
                            <Combobox.Input
                                id="comboBoxInput"
                                size={1}
                                className="mx-2 flex flex-grow border-none text-sm text-gray-900 focus:ring-0 sm:w-auto"
                                onChange={(event) => {
                                    setQueryText(event.target.value)
                                }}
                                value={queryText}
                            />
                        </div>
                    )}
                </div>

                <div className="relative mt-1 w-full">
                    <Transition
                        as={Fragment}
                        show={disableInput ? false : undefined}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => {
                            setQueryText('')
                        }}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredTags.length === 0 && queryText !== '' ? (
                                <div className="relative z-10 cursor-default select-none  bg-white px-4 py-2 text-gray-700">
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
