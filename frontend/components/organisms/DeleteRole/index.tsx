import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Modal from '@/components/templates/Modal'
import DELETE_ROLE from '@/helpers/graphql/mutations/delete_role'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { errorNotify, successNotify } from '../../../helpers/toast'

type Props = {
    id: number
    refetchHandler: (isDelete?: boolean) => void
}

const DeleteRole = ({ id, refetchHandler }: Props): JSX.Element => {
    const [showModal, setShowModal] = useState(false)
    const [deleteRole] = useMutation(DELETE_ROLE)

    const onSubmit = (): void => {
        if ([1, 2, 3].includes(+id)) {
            errorNotify('You cannot delete this role!')
            setShowModal(false)
            return
        }

        deleteRole({ variables: { id } })
            .then(() => {
                successNotify('Role deleted successfully!')
                refetchHandler(true)
                setShowModal(false)
            })
            .catch(() => {
                errorNotify('There was an error removing the role!')
            })
    }

    return (
        <div>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    setShowModal(true)
                }}
            >
                <Icons name="trash" />
            </Button>
            <Modal
                title="Delete Role"
                isOpen={showModal}
                handleClose={() => {
                    setShowModal(false)
                }}
                handleSubmit={() => {
                    onSubmit()
                }}
                submitLabel="Delete"
            >
                Are you sure you wish to delete this role?
            </Modal>
        </div>
    )
}

export default DeleteRole
