import Modal from '@/components/templates/Modal'
import DELETE_COMMENT from '@/helpers/graphql/mutations/delete_comment'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'

type Props = {
    id: number
    isOpen: boolean
    closeDelete: () => void
    children?: string | JSX.Element
    refetchHandler: () => void
}

const DeleteComment = ({ id, isOpen, closeDelete, refetchHandler }: Props): JSX.Element => {
    const [deleteComment] = useMutation(DELETE_COMMENT)

    const onSubmit = (): void => {
        deleteComment({ variables: { id } })
            .then(async () => {
                successNotify('Comment deleted successfully!')

                refetchHandler()

                closeDelete()
            })
            .catch((err) => {
                errorNotify(err.message)

                closeDelete()
            })
    }

    return (
        <Modal
            title="Confirm Delete"
            isOpen={isOpen}
            handleClose={closeDelete}
            handleSubmit={() => {
                onSubmit()
            }}
            submitLabel="Delete"
        >
            Are you sure you wish to delete this?
        </Modal>
    )
}

export default DeleteComment
