type Props = {
    name: string
    type?: string
    label?: string
    placeholder?: string
    value: string
    icon?: JSX.Element
    additionalClass?: string
    isValid?: boolean
    error?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({
    name,
    type = 'text',
    label,
    placeholder,
    value,
    icon,
    additionalClass,
    isValid = true,
    error = '',
    onChange,
}: Props): JSX.Element => {
    const renderIcon = (): JSX.Element | null => {
        return icon ?? null
    }

    return (
        <>
            <div className="relative">
                {label && (
                    <label
                        htmlFor={name}
                        className="mb-2 text-sm font-medium capitalize text-neutral-900"
                    >
                        {label}
                    </label>
                )}
                {renderIcon()}
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    className={`${
                        additionalClass ?? ''
                    } w-full rounded-md border border-neutral-300 p-2.5 text-sm text-neutral-900 placeholder-neutral-disabled focus:border-blue-500 focus:ring-blue-500`}
                    placeholder={placeholder ?? ''}
                    onChange={onChange}
                />
            </div>
            {!isValid && <span className="ml-2 text-xs text-primary-900">{error}</span>}
        </>
    )
}

export default InputField
