import Button from '@/components/atoms/Button'
import Dropdown from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import { Fragment, useState } from 'react'
import { Controller } from 'react-hook-form'

const RoleForm = (): JSX.Element => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    }
    return (
        <Fragment>
            <Button onClick={() => setIsModalOpen(true)}>Add Role</Button>
        </Fragment>
    )
}

export default RoleForm
