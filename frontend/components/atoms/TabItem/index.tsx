import React from 'react'

export type TabType = {
    label: string
    isSelected: boolean
    onClick: React.MouseEventHandler
}

const TabItem = ({ label, isSelected, onClick }: TabType): JSX.Element => {
    return (
        <div
            className={`min-w-[120px] space-x-2.5 p-2.5 text-sm ${
                isSelected ? 'border-b-2 border-primary-base bg-primary-200' : ''
            }`}
            onClick={onClick}
        >
            {label}
        </div>
    )
}

export default TabItem
