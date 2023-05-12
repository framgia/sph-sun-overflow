type Props = {
    name: string
    label: string
    value: string
    isValid: boolean
    error: string
    rows?: number
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea = ({
    name,
    label,
    value,
    isValid,
    error,
    onChange,
    rows = 3,
}: Props): JSX.Element => {
    return (
        <div>
            <label htmlFor={name} className="mb-2 text-sm font-medium capitalize text-neutral-900">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                className={`${
                    !isValid ? 'border-primary-base' : 'border-neutral-300'
                } w-full rounded-md border p-2.5 text-sm text-neutral-900 focus:border-primary-blue focus:ring-primary-blue`}
                placeholder={label}
                onChange={onChange}
            />
            {!isValid && <span className="ml-2 text-xs text-primary-900">{error}</span>}
        </div>
    )
}

export default TextArea
