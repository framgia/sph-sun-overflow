import * as React from 'react'

type TUsage =
    | 'primary'
    | 'light'
    | 'ask_question'
    | 'date_filter'
    | 'answered_filter'
    | 'paginate'
    | 'follow'
    | 'icon'
    | 'popover'
    | 'cancel-item'
    | 'edit-top-right'
    | 'back-button'
    | 'toggle-modal'
    | 'modal-cancel'
    | 'modal-submit'
    | 'follow-modal'
    | 'main-follow'
type Props = {
    usage?: TUsage | string
    size?: 'regular' | 'large' | 'medium'
    type?: 'button' | 'submit' | 'reset'
    additionalClass?: string
    isDisabled?: boolean
    children: JSX.Element | string
    onClick?: React.MouseEventHandler
}

const getButtonClasses = (usage: string, size: string): string => {
    switch (usage) {
        case 'filled':
            return `items-center font-semibold rounded-[5px] px-4 bg-primary-900 text-white capitalize focus:ring-1 focus:ring-primary-900 focus:bg-primary-900 ${
                size === 'regular'
                    ? 'font-normal text-xs h-7'
                    : size === 'medium'
                    ? 'text-sm h-9 font-semibold'
                    : 'text-sm h-10 font-semibold'
            }`
        case 'stroke':
            return `items-center font-semibold rounded-[5px] px-4 border bg-neutral-white border-primary-900 text-primary-900 capitalize focus:ring-1 focus:ring-primary-900 ${
                size === 'regular'
                    ? 'font-normal text-xs h-7'
                    : size === 'medium'
                    ? 'text-sm h-9 font-semibold'
                    : 'text-sm h-10 font-semibold'
            }`
        case 'grayed':
            return `items-center font-semibold rounded-[5px] px-4 border bg-neutral-white border-neutral-900 text-neutral-900 capitalize focus:ring-1 focus:ring-neutral-900 ${
                size === 'regular'
                    ? 'font-normal text-xs h-7'
                    : size === 'medium'
                    ? 'text-sm h-9 font-semibold'
                    : 'text-sm h-10 font-semibold'
            }`
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
        case 'popover':
            return 'rounded-[5px] h-[28px] border-2 px-4 text-[12px] text-neutral-900 bg-white border-neutral-900 border-[1px] hover:bg-neutral-200 outline-none'
        case 'cancel-item':
            return 'items-center rounded-full border-2 outline-0 border-primary-red absolute outline-primary-red -top-2 -right-2 bg-white text-primary-red p-1 hover:bg-primary-red hover:text-white active:bg-primary-red active:text-white active:outline active:outline-[2px]'
        case 'edit-top-right':
            return 'absolute top-0 right-0 cursor-pointer'
        case 'back-button':
            return 'text-xl text-primary-gray hover:text-primary-red'
        case 'toggle-modal':
            return 'cursor-pointer'
        case 'modal-cancel':
            return 'items-center rounded-md border-2 px-4 border-primary-red text-primary-red text-sm hover:bg-light-red py-1'
        case 'modal-submit':
            return 'items-center rounded-md bg-primary-red text-white px-4 text-sm hover:bg-secondary-red py-1'
        case 'question-form':
            return 'px-10 inline-flex items-center justify-center rounded-md bg-primary-red p-4 text-center text-sm text-white hover:bg-dark-red focus:outline-none focus:ring-1 focus:ring-red-700'
        case 'follow-modal-follow':
            return 'border-neutral-900 bg-primary-300 border rounded-md font-semibold text-xs text-neutral-900 w-20 h-7'
        case 'follow-modal-following':
            return 'border-neutral-900 border rounded-md font-semibold text-xs text-neutral-900 w-20 h-7'
        case 'follow-modal-unfollow':
            return 'border-primary-700 border rounded-md font-semibold text-xs text-primary-700 bg-neutral-white w-[84px] h-7'
        case 'main-follow':
            return 'w-full rounded border border-red-400 font-bold text-primary-900 text-sm px-4 py-2 h-9'
        default:
            return 'items-center rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium focus:ring-1 text-red-700 border-red-500 focus:ring-red-600 hover:bg-rose-200'
    }
}

const Button = ({
    usage = 'primary',
    type = 'submit',
    size = 'regular',
    additionalClass = '',
    isDisabled = false,
    children,
    onClick,
}: Props): JSX.Element => {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            type={type}
            className={`${getButtonClasses(usage, size)} ${additionalClass}`}
        >
            {children}
        </button>
    )
}

export default Button
