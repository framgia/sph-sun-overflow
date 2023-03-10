import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Modal from '@/components/templates/Modal'
import DELETE_MEMBER from '@/helpers/graphql/mutations/delete_member'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {
    id: number
    name: string
    role: string
    refetchHandler: () => void
}

const RemoveMember = ({ id, name, role, refetchHandler }: Props): JSX.Element => {
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [deleteMember] = useMutation(DELETE_MEMBER)

    const closeDelete = () => {
        setIsOpenDelete(!isOpenDelete)
    }

    const onSubmit = () => {
        deleteMember({
            variables: {
                id: id,
            },
        })
            .then(() => {
                successNotify('Member removed successfully!')
                refetchHandler()
                closeDelete()
            })
            .catch(() => {
                errorNotify('There was an error removing the member!')
            })
    }

    return (
        <div>
            <Button usage="toggle-modal" onClick={() => setIsOpenDelete(true)}>
                <Icons name="table_delete" />
            </Button>
            {isOpenDelete && (
                <Modal
                    title={`Removing ${name} (${role})`}
                    submitLabel="Confirm"
                    isOpen={isOpenDelete}
                    handleClose={closeDelete}
                    handleSubmit={onSubmit}
                >
                    Are you sure you want to remove this member?
                </Modal>
            )}
        </div>
    )
}

export default RemoveMember
