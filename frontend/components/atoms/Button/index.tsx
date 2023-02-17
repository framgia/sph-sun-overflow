import * as React from 'react'

type Props = {
    usage?: string
    type?: 'button' | 'submit' | 'reset'
    additionalClass?: string
    isDisabled?: boolean
    children: JSX.Element | string
    onClick?: React.MouseEventHandler
}

const getButtonClasses = (usage: string): string => {
    switch (usage) {
        case 'primary':
            return 'items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 text-red-700 border-red-500 focus:ring-red-600 hover:bg-rose-200'
        case 'light':
            return 'items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 text-gray-700 bg-white focus:ring-gray-600 hover:bg-slate-100'
        case 'ask_question':
            return 'items-center rounded-2xl py-3 px-5 border outline-2 text-primary-red font-bold border-primary-red bg-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.25)] hover:bg-primary-red hover:text-white active:bg-primary-red active:text-white active:outline active:outline-primary-red'
        case 'date_filter':
            return 'items-center py-1 px-4 rounded-l-md border-y border-l border-border-black bg-white hover:bg-light-gray'
        case 'answered_filter':
            return 'items-center py-1 px-4 rounded-r-md border border-border-black hover:bg-light-red'
        case 'paginate':
            return 'w-12 h-7 flex flex-row justify-center items-center px-3 border border-primary-red rounded-full text-primary-red'
        case 'follow':
            return 'items-center rounded-3xl border-2 text-center px-12 py-2 text-xl font-medium focus:ring-1 text-red-700 border-red-500 focus:ring-red-600 hover:bg-rose-200'
        case 'icon':
            return 'absolute inset-y-0 right-0 mr-2 flex items-center'
        default:
            return 'items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 text-red-700 border-red-500 focus:ring-red-600 hover:bg-rose-200'
    }
}

const Button = ({
    usage = 'primary',
    type = 'submit',
    additionalClass = '',
    isDisabled = false,
    children,
    onClick,
}: Props) => {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            type={type}
            className={`${getButtonClasses(usage)} ${additionalClass}`}
        >
            {children}
        </button>
    )
}

export default Button
