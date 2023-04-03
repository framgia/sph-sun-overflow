import { Option, Select } from '@material-tailwind/react'
import type { ControllerRenderProps } from 'react-hook-form'

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

const Dropdown = ({ name, label, options, onChange, value, isError }: FormProps): JSX.Element => {
    return (
        <div className="w-full">
            <Select
                id={name}
                name={name}
                onChange={onChange}
                label={label}
                value={`${value}`}
                color="red"
            >
                {options.map((option) => {
                    return (
                        <Option key={option.id} value={`${option.id}`}>
                            {option.name}
                        </Option>
                    )
                })}
            </Select>
        </div>
    )
}

export default Dropdown
