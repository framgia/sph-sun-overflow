import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Dropdown, { OptionType } from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import UPDATE_MEMBER from '@/helpers/graphql/mutations/update_member'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type Props = {
    id: number
    user_id: number
    team_id: number
    roles: OptionType[]
    role: string
    refetchHandler: () => void
}

type FormValues = {
    role: number
}

const EditMember = ({ id, user_id, team_id, roles, role, refetchHandler }: Props) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [dropdownErrors, setDropdownErrors] = useState({ role: '' })
    const [updateMember] = useMutation(UPDATE_MEMBER)
    const defaultRoleId = roles?.find((r) => r.name === role)?.id

    const { setValue, handleSubmit, reset, control } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const closeEdit = () => {
        setIsOpenEdit(!isOpenEdit)
    }

    const onSubmit = (data: FormValues) => {
        let valid = true
        let noChangeCount = 0
        const dataFields = [{ key: 'role', display: 'Role' }]
        const errorFields = { role: '' }

        dataFields.map((field) => {
            const key = field.key as keyof typeof data

            if (!data[key]) {
                valid = false
                errorFields[key] = `${field.display} must not be empty`
            }

            if (data[key] === defaultRoleId) {
                noChangeCount += 1
            }
        })

        if (noChangeCount === dataFields.length) {
            valid = false
            closeEdit()
        }

        if (valid) {
            updateMember({
                variables: {
                    id: id,
                    user_id: user_id,
                    team_role_id: data.role,
                    team_id: team_id,
                },
            })
                .then(() => {
                    successNotify('Member updated successfully!')
                    reset()
                    refetchHandler()
                    closeEdit()
                })
                .catch(() => {
                    errorNotify('There was an error updating the member!')
                })
        }

        setDropdownErrors(errorFields)
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
                    handleClose={closeEdit}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="role"
                            defaultValue={defaultRoleId}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    key="role-select"
                                    name="role"
                                    label="Select role"
                                    options={roles}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </form>
                </Modal>
            )}
        </div>
    )
}

export default EditMember
