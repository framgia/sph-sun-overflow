import type { ControllerRenderProps } from 'react-hook-form'
import Select, { type CSSObjectWithLabel, type StylesConfig } from 'react-select'

export type OptionType = {
    value: number
    label: string
}

type FormProps = {
    name?: string
    label?: string
    options: OptionType[]
    onChange: ControllerRenderProps['onChange']
    value: unknown
    isError?: boolean
}

const Dropdown = ({ name, label, options, onChange, value, isError }: FormProps): JSX.Element => {
    const selectStyles: StylesConfig<any, false, any> = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const design: CSSObjectWithLabel = {
                ...styles,
                // borderColor: '#F5D3CF',
                backgroundColor: isSelected ? '#F5D3CF' : isFocused ? '#FFF4F2' : '',
                color: '#333333',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled ? (isSelected ? '#EEB4AC' : '#F5D3CF') : undefined,
                },
            }

            return design
        },
        control: (base, state) => {
            const design: CSSObjectWithLabel = {
                ...base,
                borderColor: isError ? '#FF2200' : '#B8ABAB',
                // Removes weird border around container
                boxShadow: '',
                '&:hover': {
                    // Overwrittes the different states of border
                    borderColor: '#B8ABAB',
                },
            }

            return design
        },
    }

    return (
        <div className="w-full">
            {label && (
                <div className="mb-2 text-sm font-medium capitalize text-neutral-900">{label}</div>
            )}
            <Select
                options={options}
                defaultValue={value}
                isSearchable={false}
                styles={selectStyles}
                onChange={onChange}
            />
        </div>
    )
}

export default Dropdown
