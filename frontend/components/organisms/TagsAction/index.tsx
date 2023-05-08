import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Modal from '@/components/templates/Modal'
import DELETE_TAG from '@/helpers/graphql/mutations/delete_tag'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import TagsFormModal from '../TagsFormModal'

type Props = {
    id: number
    name: string
    description: string
    refetchHandler: (isDelete?: boolean) => void
}

const renderDeleteAction = (
    id: number,
    name: string,
    refetch: (isDelete?: boolean) => void
): JSX.Element => {
    const [loading, setLoading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteTag] = useMutation(DELETE_TAG)

    const closeDeleteModal = (): void => {
        setShowDeleteModal(false)
    }

    const handleSubmit = (): void => {
        setLoading(true)
        deleteTag({ variables: { id } })
            .then(() => {
                successNotify('Tag deleted.')
                refetch(true)
            })
            .catch(() => {
                errorNotify('Failed to delete tag.')
            })
            .finally(() => {
                setShowDeleteModal(false)
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
    }

    return (
        <>
            <Button
                usage="toggle-modal"
                onClick={(): void => {
                    setShowDeleteModal(true)
                }}
            >
                <Icons name="trash" size="18" />
            </Button>
            <Modal
                title="Delete Tag"
                loading={loading}
                isOpen={showDeleteModal}
                handleClose={closeDeleteModal}
                handleSubmit={handleSubmit}
                submitLabel="Delete"
            >
                <div className="flex flex-wrap gap-1">
                    Are you sure you wish to delete the{' '}
                    <div className="truncate font-bold">{name}</div> tag?
                </div>
            </Modal>
        </>
    )
}

const TagsActions = ({ id, name, description, refetchHandler }: Props): JSX.Element => {
    const [showEditModal, setShowEditModal] = useState(false)

    const initialData = {
        id,
        name,
        description,
    }

    const closeEditModal = (): void => {
        setShowEditModal(false)
    }

    return (
        <div className="flex flex-row justify-start gap-4">
            <Button
                usage="toggle-modal"
                onClick={(): void => {
                    setShowEditModal(true)
                }}
            >
                <Icons name="pencil" size="18" />
            </Button>
            <TagsFormModal
                isOpen={showEditModal}
                closeModal={closeEditModal}
                refetchHandler={refetchHandler}
                initialData={initialData}
            />
            {renderDeleteAction(id, name, refetchHandler)}
        </div>
    )
}

export default TagsActions
