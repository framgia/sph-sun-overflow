import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import { useState } from 'react'
import TagsFormModal from '../TagsFormModal'

type Props = {
    id: number
    name: string
    description: string
    refetchHandler: () => void
}

const TagsActions = ({ id, name, description, refetchHandler }: Props): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const initialData = {
        id,
        name,
        description,
    }

    const closeModal = (): void => {
        setIsOpen(false)
    }

    return (
        <div className="flex flex-row gap-4">
            <Button
                usage="toggle-modal"
                onClick={(): void => {
                    setIsOpen(true)
                }}
            >
                <Icons name="table_edit" additionalClass="fill-gray-500" />
            </Button>
            <Button usage="toggle-modal">
                <Icons name="table_delete" additionalClass="fill-gray-500" />
            </Button>
            <TagsFormModal
                isOpen={isOpen}
                closeModal={closeModal}
                refetchHandler={refetchHandler}
                initialData={initialData}
            />
        </div>
    )
}

export default TagsActions
