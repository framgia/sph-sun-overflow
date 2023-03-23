import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Modal from '@/components/templates/Modal'
import { useState } from 'react'
import TagsFormModal from '../TagsFormModal'

type Props = {
    id: number
    name: string
    description: string
    refetchHandler: () => void
}

const TagsActions = ({ id, name, description, refetchHandler }: Props): JSX.Element => {
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const initialData = {
        id,
        name,
        description,
    }

    const closeEditModal = (): void => {
        setShowEditModal(false)
    }

    const closeDeleteModal = (): void => {
        setShowDeleteModal(false)
    }

    return (
        <div className="flex flex-row gap-4">
            <Button
                usage="toggle-modal"
                onClick={(): void => {
                    setShowEditModal(true)
                }}
            >
                <Icons name="table_edit" additionalClass="fill-gray-500" />
            </Button>
            <Button
                usage="toggle-modal"
                onClick={(): void => {
                    setShowDeleteModal(true)
                }}
            >
                <Icons name="table_delete" additionalClass="fill-gray-500" />
            </Button>
            <TagsFormModal
                isOpen={showEditModal}
                closeModal={closeEditModal}
                refetchHandler={refetchHandler}
                initialData={initialData}
            />
            <Modal
                title="Delete Tag"
                isOpen={showDeleteModal}
                handleClose={closeDeleteModal}
                handleSubmit={closeDeleteModal}
                submitLabel="Delete"
            >
                <span>
                    Are you sure you wish to delete the{' '}
                    <span className="font-bold">JavaScript</span> tag?
                </span>
            </Modal>
        </div>
    )
}

export default TagsActions
