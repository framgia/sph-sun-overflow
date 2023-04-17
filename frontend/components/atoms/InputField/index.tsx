type Props = {
    name: string
    label: string
    value: string
    isValid: boolean
    error: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ name, label, value, isValid, error, onChange }: Props): JSX.Element => {
    return (
        <div>
            <label htmlFor={name} className="mb-2 text-sm font-medium capitalize text-neutral-900">
                {label}
            </label>
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                className="w-full rounded-md border border-neutral-300 p-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder={label}
                onChange={onChange}
            />
            {!isValid && <span className="ml-2 text-xs text-primary-red">{error}</span>}
        </div>
    )
}

export default InputField
