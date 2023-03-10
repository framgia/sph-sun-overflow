import React, { Fragment, useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { HiCheck } from 'react-icons/hi2'
import { UseFormSetValue } from 'react-hook-form'
export interface ITag {
    id: number
    name: string
    description: string
}
interface ComboboxProps {
    setValue: ((value: any) => void) | UseFormSetValue<any>
    hasBtn: boolean
    btnName: string
    placeholder: string
    extraInputClasses: string
    extraBtnClasses: string
    suggestionProps: ITag[]
    queryText: string
    setQueryText: Dispatch<SetStateAction<string>>
}

const CustomCombobox = ({
    setValue,
    hasBtn = false,
    btnName = 'Submit',
    placeholder = 'Input',
    extraInputClasses = '',
    extraBtnClasses = '',
    suggestionProps = [],
    queryText,
    setQueryText,
}: ComboboxProps) => {
    const [selected, setSelected] = useState<any>(null)

    const handleSubmit = (e: React.MouseEventHandler<HTMLElement>) => {
        if (selected !== null) {
            setValue(selected)
            setSelected(null)
        }
    }

    return (
        <div className="flex w-full flex-wrap p-4">
            <Combobox value={selected} onChange={setSelected}>
                <div className="flex w-full py-2">
                    <Combobox.Input
                        id="comboBoxInput"
                        placeholder={placeholder}
                        className={`w-0 grow text-sm leading-5 text-gray-900 focus:ring-0 ${extraInputClasses}`}
                        onChange={(event) => setQueryText(event.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                        displayValue={(suggestion) => {
                            if (suggestion) {
                                return suggestion.name
                            }
                            return null
                        }}
                    />
                    {hasBtn && (
                        <div className={extraBtnClasses} onClick={handleSubmit}>
                            {btnName}
                        </div>
                    )}
                </div>

                <div className="relative mt-1 w-full">
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQueryText('')}
                    >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {suggestionProps.length === 0 && queryText !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                suggestionProps.map((suggestion) => (
                                    <Combobox.Option
                                        key={suggestion.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={suggestion}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                                >
                                                    {suggestion.name}
                                                </span>
                                                <span className={`block truncate pl-3`}>
                                                    {suggestion.description}
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

export default CustomCombobox
