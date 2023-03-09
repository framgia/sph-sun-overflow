import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Modal from '@/components/templates/Modal'
import { useState } from 'react'

type Props = {
    id: number
    name: string
    role: string
}

const RemoveMember = ({ id, name, role }: Props): JSX.Element => {
    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const handleDeleteSubmit = () => {
        //submit
    }

    const closeDelete = () => {
        setIsOpenDelete(!isOpenDelete)
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
                    handleSubmit={handleDeleteSubmit}
                    handleClose={closeDelete}
                >
                    Are you sure you want to remove this member?
                </Modal>
            )}
        </div>
    )
}

export default RemoveMember
