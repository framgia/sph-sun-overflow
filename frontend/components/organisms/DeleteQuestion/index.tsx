import Modal from '@/components/templates/Modal'
import DELETE_QUESTION from '@/helpers/graphql/mutations/delete_question'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

type Props = {
    id: number
    isOpen: boolean
    closeDelete: () => void
    children?: string | JSX.Element
    redirectLink: string
}

const DeleteQuestion = ({ id, isOpen, closeDelete, redirectLink }: Props): JSX.Element => {
    const [deleteQuestion] = useMutation(DELETE_QUESTION)
    const router = useRouter()

    const onSubmit = (): void => {
        deleteQuestion({ variables: { id } })
            .then(async () => {
                successNotify('Question deleted successfully!')

                void router.push(redirectLink)

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

export default DeleteQuestion
