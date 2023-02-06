import * as React from 'react'

type Props = {
    usage?: string
    type?: 'button' | 'submit' | 'reset'
    additionalClass?: string
    isDisabled: boolean
    children: JSX.Element | string
    onClick: React.MouseEventHandler
}

const Button = ({
    usage = 'primary',
    type = 'submit',
    additionalClass = '',
    isDisabled = false,
    children,
    onClick,
}: Props) => {
    let htmlClasses: string = ''

    switch (usage) {
        case 'primary':
            htmlClasses =
                'items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 text-red-700 border-red-500 focus:ring-red-600 hover:bg-rose-200'
            break
        case 'light':
            htmlClasses =
                'items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 text-gray-700 bg-white focus:ring-gray-600 hover:bg-slate-100'
            break
        case 'ask_question':
            htmlClasses =
                'items-center rounded-2xl py-3 px-5 border outline-2 text-primary-red font-bold border-primary-red bg-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.25)] hover:bg-primary-red hover:text-white active:bg-primary-red active:text-white active:outline active:outline-primary-red'
            break
        case 'date_filter':
            htmlClasses =
                'items-center py-1 px-4 rounded-l-md border-y border-l border-border-black bg-white hover:bg-light-gray'
            break
        case 'answered_filter':
            htmlClasses =
                'items-center py-1 px-4 border border-border-black bg-white hover:bg-light-gray'
            break
        case 'paginate':
            htmlClasses =
                'w-12 h-7 flex flex-row justify-center items-center px-3 border outline-1 border-primary-red bg-white rounded-full text-primary-red hover:text-white hover:bg-primary-red active:outline active:outline-primary-red active:bg-primary-red active:text-white'
            break
        default:
            htmlClasses =
                'items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 text-red-700 border-red-500 focus:ring-red-600 hover:bg-rose-200'
            break
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            type={type}
            className={`${htmlClasses} ${additionalClass}`}
        >
            {children}
        </button>
    )
}

export default Button
