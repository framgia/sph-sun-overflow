import Modal from '@/components/templates/Modal'
import DELETE_ANSWER from '@/helpers/graphql/mutations/delete_answer'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'

type Props = {
    id: number
    isOpen: boolean
    closeDelete: () => void
    children?: string | JSX.Element
    refetchHandler: () => void
}

const DeleteAnswer = ({ id, isOpen, closeDelete, refetchHandler }: Props): JSX.Element => {
    const [deleteAnswer] = useMutation(DELETE_ANSWER)

    const onSubmit = (): void => {
        deleteAnswer({ variables: { id } })
            .then(async () => {
                successNotify('Answer deleted successfully!')

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

export default DeleteAnswer
