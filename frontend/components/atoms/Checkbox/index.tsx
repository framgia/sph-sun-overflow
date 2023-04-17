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
                className="h-4 w-4 rounded border-gray-300 text-xs checked:text-red-200 checked:ring-red-200 active:ring-red-200"
                onChange={onChange}
            />
            <label htmlFor={id} className="text-xs text-gray-900">
                {label}
            </label>
        </div>
    )
}

export default Checkbox
