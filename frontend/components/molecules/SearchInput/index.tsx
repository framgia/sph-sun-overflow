import { Input } from '@material-tailwind/react'
import React from 'react'
import { HiSearch } from 'react-icons/hi'

type Props = {
    placeholder?: string
    usage?: 'Default' | 'Users'
    value?: string
    onChange: (value: string) => void
}

const SearchInput = ({ placeholder, usage = 'Default', value, onChange }: Props): JSX.Element => {
    return (
        <div className="w-[310px]">
            <Input
                size="md"
                className="!bg-white placeholder-shown:border-gray-300 placeholder-shown:border-t-gray-300"
                label={placeholder}
                icon={<HiSearch className="text-lg" />}
                name="search"
                color="red"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e.target.value)
                }}
                autoComplete="off"
            />
        </div>
    )
}

export default SearchInput
