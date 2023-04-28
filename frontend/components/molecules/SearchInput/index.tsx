import Icons from '@/components/atoms/Icons'

type Props = {
    placeholder?: string
    usage?: 'Default' | 'Users'
    value?: string
    onChange: (value: string) => void
}

const SearchInput = ({ placeholder, usage = 'Default', value, onChange }: Props): JSX.Element => {
    return (
        <div className="relative">
            <div className="flex items-center justify-start gap-1.5">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                    <Icons name="search" additionalClass="text-neutral-disabled" />
                </div>
                <input
                    type="text"
                    name="search"
                    className="h-10 w-[400px] rounded-[5px] border border-neutral-disabled bg-white p-2 pl-8 text-sm font-bold text-neutral-disabled focus:border-primary-blue focus:ring-primary-blue"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value)
                    }}
                />
            </div>
        </div>
    )
}

export default SearchInput
