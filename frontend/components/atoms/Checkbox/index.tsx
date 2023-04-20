type Props = {
    id: string
    defaultChecked: boolean
    value: number
    label: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = ({ id, defaultChecked, value, label, onChange }: Props): JSX.Element => {
    return (
        <div className="flex items-center space-x-1">
            <input
                defaultChecked={defaultChecked}
                id={id}
                type="checkbox"
                value={value}
                className="h-3 w-3 rounded border-neutral-300 text-xs checked:text-[#5F5F5F] focus:ring-[#5F5F5F] active:ring-[#5F5F5F]"
                onChange={onChange}
            />
            <label htmlFor={id} className="text-center text-xs font-normal text-neutral-900">
                {label}
            </label>
        </div>
    )
}

export default Checkbox
