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
                className="h-4 w-4 rounded border-neutral-300 text-xs checked:text-[#373737] focus:ring-[#373737] active:ring-[#373737]"
                onChange={onChange}
            />
            <label htmlFor={id} className="text-xs text-neutral-900">
                {label}
            </label>
        </div>
    )
}

export default Checkbox
