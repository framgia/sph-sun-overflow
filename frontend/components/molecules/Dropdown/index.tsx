import { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

export type OptionType = {
    id: number
    name: string
}

type FormProps = {
    name?: string
    label: string
    options: OptionType[]
    onChange: ControllerRenderProps['onChange']
    value: number
    isError?: boolean
}

const Dropdown = ({ name, label, options, onChange, value, isError }: FormProps) => {
    return (
        <div className="w-full">
            <label>{label}</label>
            <select
                id={name}
                onChange={onChange}
                value={value}
                className={`${
                    isError ? 'border-primary-red' : 'border-secondary-gray'
                } w-full rounded-lg border px-3 py-2.5 text-sm text-secondary-black focus:border-blue-500 focus:ring-blue-500`}
            >
                {options.map((option) => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Dropdown
