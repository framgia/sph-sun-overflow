import * as React from 'react'

const Button = ({
    usage = 'primary',
    type = 'submit',
    additionalClass,
    isDisabled = false,
    children,
    onClick,
}) => {
    const getClass = () => {
        if (usage === 'primary') {
            return `text-primary-red border-primary-red focus:ring-red-600 hover:bg-rose-200`
        } else if (usage === 'light') {
            return `text-gray-700 bg-white focus:ring-gray-600 hover:bg-slate-100`
        }
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            type={type}
            className={`items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 ${getClass()} ${additionalClass}`}
        >
            {children}
        </button>
    )
}

export default Button
