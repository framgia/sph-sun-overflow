import React from 'react'
import { HiEye, HiPencilAlt } from 'react-icons/hi'
type ViewToggleProps = {
    isPreview: boolean | undefined
    setIsPreview: (input: boolean) => void
}

const PreviewToggle = ({ isPreview = false, setIsPreview }: ViewToggleProps): JSX.Element => {
    const baseStyle =
        'flex cursor-pointer gap-[2px] transition-all duration-300 ease-in-out items-center p-1'
    const handleToggle = (e: React.MouseEvent): void => {
        e.preventDefault()
        setIsPreview(!isPreview)
    }
    return (
        <div
            onClick={handleToggle}
            className="flex divide-x divide-neutral-900 overflow-clip rounded-[5px] border border-neutral-900 "
        >
            <div className={`${baseStyle}`}>
                <div className="">
                    <HiEye />
                </div>
                {!isPreview && <span className="truncate text-xs">Preview</span>}
            </div>
            <div className={`${baseStyle}`}>
                <div className="">
                    <HiPencilAlt />
                </div>
                {isPreview && <span className="truncate text-xs">Edit</span>}
            </div>
        </div>
    )
}
export default PreviewToggle
