import { CustomIcons } from '@/components/atoms/Icons'

const { GridIcon, ListIcon } = CustomIcons

type ViewToggleProps = {
    view: string
}

const ViewToggle = ({ view }: ViewToggleProps): JSX.Element => {
    const baseStyle = 'flex cursor-pointer gap-[2px] p-2 transition-all duration-300 ease-in-out'

    return (
        <div className="flex h-full divide-x divide-neutral-900 overflow-clip rounded-[5px] border border-neutral-900">
            <div className={`${baseStyle} ${view === 'Grid' ? 'bg-primary-200' : ''}`}>
                <div className="m-auto pb-[1px]">
                    <GridIcon />
                </div>
                {view === 'Grid' && <span>Grid View</span>}
            </div>
            <div className={`${baseStyle} ${view === 'List' ? 'bg-primary-200' : ''}`}>
                <div className="m-auto pb-[1px]">
                    <ListIcon />
                </div>
                {view === 'List' && <span>List View</span>}
            </div>
        </div>
    )
}

export default ViewToggle
