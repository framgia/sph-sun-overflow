import { useState } from 'react'

export type OptionType = {
    id: number
    name: string
}

type FormProps = {
    name: string
    label: string
    options: OptionType[]
}

const Dropdown = ({ name, label, options }: FormProps) => {
    const [selected, setSelected] = useState(options[0].name)

    return (
        <div className="w-full">
            <label>{label}</label>
            <select
                id={name}
                defaultValue={selected}
                className="w-full rounded-lg border border-secondary-gray px-3 py-2.5 text-sm text-secondary-black focus:border-blue-500 focus:ring-blue-500"
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
