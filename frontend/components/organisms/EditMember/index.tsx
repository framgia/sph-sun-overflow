import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Dropdown, { OptionType } from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import { useState } from 'react'

type Props = {
    id: number
    roles: OptionType[]
}

const EditMember = ({ id, roles }: Props) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const handleEditSubmit = () => {
        //submit
    }

    const closeEdit = () => {
        setIsOpenEdit(!isOpenEdit)
    }

    return (
        <div>
            <Button usage="toggle-modal" onClick={() => setIsOpenEdit(true)}>
                <Icons name="table_edit" />
            </Button>
            {isOpenEdit && (
                <Modal
                    title={`Assign Role`}
                    submitLabel="Save"
                    isOpen={isOpenEdit}
                    handleSubmit={handleEditSubmit}
                    handleClose={closeEdit}
                >
                    <form onSubmit={handleEditSubmit}>
                        <Dropdown name="" label="Select Role" options={roles} />
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default EditMember
