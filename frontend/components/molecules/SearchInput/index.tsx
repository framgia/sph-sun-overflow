import Icons from '@/components/atoms/Icons'

type Props = {
    placeholder?: string
    usage?: 'Default' | 'Users'
    value?: string
    onChange: (value: string) => void
}

const SearchInput = ({ placeholder, value, usage = 'Default', onChange }: Props): JSX.Element => {
    const divStyle = {
        Default: 'relative flex w-80 flex-row',
        Users: 'relative flex w-80 flex-row',
    }
    const inputStyle = {
        Default:
            'border-1 form-input h-11 w-full rounded-lg border-border-black bg-white px-5 focus:border-primary-red focus:ring-primary-red',
        Users: 'border-1 form-input h-13 py-3 w-full rounded-lg border-border-black bg-white px-5 focus:border-primary-red focus:ring-primary-red',
    }
    const buttonStyle = {
        Default: 'absolute inset-y-0 right-0 rounded-r-lg pr-3 pl-2',
        Users: 'absolute inset-y-0 right-0 rounded-r-lg pr-3 pl-2',
    }
    return (
        <div className={divStyle[usage]}>
            <input
                type="text"
                name="search"
                className={`${inputStyle[usage]} pr-10`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button type="submit" className={buttonStyle[usage]}>
                <Icons name="search_input_icon" />
            </button>
        </div>
    )
}

export default SearchInput
