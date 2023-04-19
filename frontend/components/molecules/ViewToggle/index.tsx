import React from 'react'

type Props = {
    view: string
}

const ViewToggle: React.FC<Props> = ({ view }) => {
    const baseStyle = 'flex cursor-pointer gap-[2px] p-2 transition-all duration-300 ease-in-out'

    return (
        <div className="flex h-full divide-x divide-neutral-900 overflow-clip rounded-[5px] border border-neutral-900">
            <div className={`${baseStyle} ${view === 'Grid' ? 'bg-primary-200' : ''}`}>
                <img className="pb-[1px]" src="/svg/Grid.svg" alt="Grid" />
                {view === 'Grid' && <span>Grid View</span>}
            </div>
            <div className={`${baseStyle} ${view === 'List' ? 'bg-primary-200' : ''}`}>
                <img className="pb-[1px]" src="/svg/List.svg" alt="List" />
                {view === 'List' && <span>List View</span>}
            </div>
        </div>
    )
}

export default ViewToggle
