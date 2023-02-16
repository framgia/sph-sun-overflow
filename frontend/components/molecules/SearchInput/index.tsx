import Icons from '@/components/atoms/Icons'

type Props = {
    placeholder?: string
}

const SearchInput = ({ placeholder }: Props): JSX.Element => {
    return (
        <div className="relative flex w-80 flex-row">
            <input
                type="text"
                name="search"
                className="border-1 form-input h-11 w-full rounded-lg border-border-black bg-white px-5 focus:border-primary-red focus:ring-primary-red"
                placeholder={placeholder}
                required
            />
            <button type="submit" className="absolute inset-y-0 right-0 rounded-r-lg pr-3 pl-2">
                <Icons name="search_input_icon" />
            </button>
        </div>
    )
}

export default SearchInput
