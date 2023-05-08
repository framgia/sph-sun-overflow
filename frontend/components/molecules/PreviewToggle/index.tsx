import React from 'react'
type ViewToggleProps = {
    isPreview: boolean | undefined
    setIsPreview: (input: boolean) => void
}

const PreviewToggle = ({ isPreview = false, setIsPreview }: ViewToggleProps): JSX.Element => {
    const handleToggle = (e: React.MouseEvent): void => {
        e.preventDefault()
        setIsPreview(!isPreview)
    }
    return (
        <div
            onClick={handleToggle}
            className={`cursor-pointer overflow-clip rounded-[5px] border border-neutral-900 p-1 transition-all duration-1000 `}
        >
            {!isPreview ? (
                <div className="flex flex-row gap-1">
                    <span className="truncate text-xs">Preview</span>
                </div>
            ) : (
                <div className="flex flex-row gap-1">
                    <span className="truncate text-xs">Edit</span>
                </div>
            )}
        </div>
    )
}
export default PreviewToggle
