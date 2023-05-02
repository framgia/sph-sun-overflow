import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Modal from '@/components/templates/Modal'
import DELETE_MEMBER from '@/helpers/graphql/mutations/delete_member'
import UPDATE_MEMBER from '@/helpers/graphql/mutations/update_member'
import GET_TEAM from '@/helpers/graphql/queries/get_team'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { Controller, useForm } from 'react-hook-form'
import type { OptionType } from '../Dropdown'
import Dropdown from '../Dropdown'

type FormValues = {
    role: OptionType
}

type Props = {
    id: number
    userId: number
    name: string
    role: string
    avatar: string
    isLeader: boolean
    hasActions: boolean
    roles: OptionType[]
    teamId: number
    teamSlug: string
    refetch: () => void
    deleteRefetch: () => void
}

const TeamUserCard = ({
    id,
    userId,
    name,
    avatar,
    role,
    isLeader,
    hasActions,
    roles,
    teamId,
    teamSlug = '',
    refetch,
    deleteRefetch,
}: Props): JSX.Element => {
    const renderActions = (): JSX.Element => {
        const [showEditModal, setShowEditModal] = useState(false)
        const [showDeleteModal, setShowDeleteModal] = useState(false)
        const [dropdownErrors, setDropdownErrors] = useState({ role: '' })

        const initialRole = roles?.find((r) => r.label === role)

        const [updateMember] = useMutation(UPDATE_MEMBER)
        const [deleteMember] = useMutation(DELETE_MEMBER, {
            refetchQueries: [{ query: GET_TEAM, variables: { slug: teamSlug } }],
        })
        const {
            handleSubmit,
            reset,
            control,
            formState: { isDirty },
        } = useForm<FormValues>({
            defaultValues: {
                role: initialRole,
            },
            mode: 'onSubmit',
            reValidateMode: 'onSubmit',
        })

        useEffect(() => {
            reset({
                role: initialRole,
            })
        }, [refetch])

        const closeEdit = (): void => {
            setShowEditModal(false)
            reset({
                role: initialRole,
            })
        }

        const onSubmitEdit = (data: FormValues): void => {
            const errorFields = { role: '' }

            if (!isDirty) {
                errorNotify('No changes were made')
                closeEdit()
                reset({
                    role: initialRole,
                })
            } else {
                updateMember({
                    variables: {
                        id,
                        user_id: userId,
                        team_role_id: data.role.value,
                        team_id: teamId,
                    },
                })
                    .then(() => {
                        successNotify('Member updated successfully!')
                        reset()
                        refetch()
                        closeEdit()
                    })
                    .catch(() => {
                        errorNotify('There was an error updating the member!')
                        closeEdit()
                        reset({
                            role: initialRole,
                        })
                    })
            }

            setDropdownErrors(errorFields)
        }

        const onSubmitDelete = (): void => {
            deleteMember({
                variables: {
                    id,
                },
            })
                .then(() => {
                    successNotify('Member removed successfully!')
                    deleteRefetch()
                    setShowDeleteModal(false)
                })
                .catch(() => {
                    errorNotify('There was an error removing the member!')
                })
        }

        return (
            <>
                <Button
                    usage="toggle-modal"
                    onClick={() => {
                        setShowEditModal(true)
                    }}
                >
                    <Icons name="pencil" size="16" />
                </Button>
                <Modal
                    title={`Assign Role to ${name}`}
                    submitLabel="Save"
                    isOpen={showEditModal}
                    handleClose={closeEdit}
                >
                    <form onSubmit={handleSubmit(onSubmitEdit)} className="w-full">
                        <Controller
                            control={control}
                            name="role"
                            defaultValue={initialRole}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    key="role-select"
                                    name="role"
                                    label="Select role"
                                    options={roles}
                                    onChange={onChange}
                                    value={value}
                                    isError={dropdownErrors.role.length > 0}
                                />
                            )}
                        />
                        {dropdownErrors.role.length > 0 && (
                            <span className="ml-2 text-sm text-primary-red">
                                {dropdownErrors.role}
                            </span>
                        )}
                    </form>
                </Modal>
                {!isLeader && (
                    <Button
                        usage="toggle-modal"
                        onClick={() => {
                            setShowDeleteModal(true)
                        }}
                    >
                        <Icons name="trash" size="16" />
                    </Button>
                )}
                <Modal
                    title={`Remove from team`}
                    submitLabel="Confirm"
                    isOpen={showDeleteModal}
                    handleClose={() => {
                        setShowDeleteModal(false)
                    }}
                    handleSubmit={onSubmitDelete}
                >
                    {`Are you sure you want to remove ${name}?`}
                </Modal>
            </>
        )
    }

    return (
        <div className="max-w-40 flex h-44 flex-col gap-2 rounded-[5px] border border-neutral-disabled p-2 text-neutral-900">
            <div className="flex h-4 justify-end gap-1">{hasActions ? renderActions() : <></>}</div>
            <Avatar
                round={true}
                name={name}
                size="56"
                alt={name}
                src={avatar}
                maxInitials={1}
                textSizeRatio={2}
                className="self-center border border-[#3D3D3D] bg-[#D9D9D9]"
            />
            <div className="flex flex-col items-center justify-between gap-1">
                <div className="text-center text-sm font-medium leading-[120%] text-neutral-900 line-clamp-2">
                    {name}
                </div>
                <div className="text-xs font-normal text-neutral-disabled line-clamp-1">{role}</div>
                {isLeader && (
                    <div className="text-xs font-normal text-primary-700 line-clamp-1">
                        Team Leader
                    </div>
                )}
            </div>
        </div>
    )
}

export default TeamUserCard
