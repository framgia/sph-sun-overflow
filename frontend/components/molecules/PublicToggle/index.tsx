import { CustomIcons } from '@/components/atoms/Icons'
import { type FormValues } from '@/components/organisms/QuestionForm'
import { useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
const { LockIcon, UnlockIcon } = CustomIcons
type ViewToggleProps = {
    value: boolean | undefined
    setValue: UseFormSetValue<FormValues>
}

const PublicToggle = ({ value = true, setValue }: ViewToggleProps): JSX.Element => {
    const [isPublic, setIsPublic] = useState<boolean>(value)
    const baseStyle =
        'flex cursor-pointer gap-[2px] p-2 transition-all duration-300 ease-in-out items-center'

    const handleOnClick = (): void => {
        setIsPublic(!isPublic)
        setValue('is_public', !isPublic)
    }
    return (
        <div
            onClick={handleOnClick}
            className="flex h-9 divide-x divide-neutral-900 overflow-clip rounded-[5px] border border-neutral-900"
        >
            <div className={`${baseStyle}`}>
                <div className="m-auto pb-[1px]">
                    <LockIcon />
                </div>
                {!isPublic && <span className="truncate text-sm">Private</span>}
            </div>
            <div className={`${baseStyle}`}>
                <div className="m-auto pb-[1px]">
                    <UnlockIcon />
                </div>
                {isPublic && <span className="truncate text-sm">Public</span>}
            </div>
        </div>
    )
}
export default PublicToggle
