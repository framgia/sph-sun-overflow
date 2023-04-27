import { CustomIcons } from '@/components/atoms/Icons'
import { type MouseEventHandler } from 'react'

const { GridIcon, ListIcon } = CustomIcons

type ViewToggleProps = {
    view: string
    onClick: MouseEventHandler
}

const ViewToggle = ({ view, onClick }: ViewToggleProps): JSX.Element => {
    const baseStyle =
        'flex cursor-pointer gap-[2px] p-2 transition-all duration-300 ease-in-out items-center'

    return (
        <div
            onClick={onClick}
            className="flex h-9 divide-x divide-neutral-900 overflow-clip rounded-[5px] border border-neutral-900"
        >
            <div className={`${baseStyle} ${view === 'Grid' ? 'bg-primary-200' : ''}`}>
                <div className="m-auto pb-[1px]">
                    <GridIcon />
                </div>
                {view === 'Grid' && <span className="truncate text-sm">Grid View</span>}
            </div>
            <div className={`${baseStyle} ${view === 'List' ? 'bg-primary-200' : ''}`}>
                <div className="m-auto pb-[1px]">
                    <ListIcon />
                </div>
                {view === 'List' && <span className="truncate text-sm">List View</span>}
            </div>
        </div>
    )
}

export default ViewToggle
