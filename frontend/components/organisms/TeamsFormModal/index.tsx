import InputField from '@/components/atoms/InputField'
import TextArea from '@/components/atoms/TextArea'
import Dropdown from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import CREATE_TEAM from '@/helpers/graphql/mutations/create_team'
import UPDATE_TEAM from '@/helpers/graphql/mutations/update_team'
import type { UserType } from '@/pages/questions/[slug]'
import type { FetchResult } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { errorNotify, successNotify } from '../../../helpers/toast'
import type { OptionType } from '../../molecules/Dropdown/index'

type FormProps = {
    initialData?: {
        id: number
        title: string
        teamLeaderId: number
        teamLeaderName: string
        description: string
    }
    isOpen: boolean
    closeModal: () => void
    refetch: () => void
    leaderOptions: UserType[]
}

type FormValues = {
    teamName: string
    teamLeader: OptionType
    teamDescription: string
}

const TeamsFormModal = ({
    initialData,
    isOpen,
    closeModal,
    refetch,
    leaderOptions,
}: FormProps): JSX.Element => {
    const [formErrors, setFormErrors] = useState({
        teamName: '',
        teamLeader: '',
        teamDescription: '',
    })
    const formTitle = initialData?.title ? 'Edit Team' : 'Add Team'

    const [createTeam] = useMutation(CREATE_TEAM)
    const [updateTeam] = useMutation(UPDATE_TEAM)

    const teamLeaders: OptionType[] = leaderOptions?.map(
        ({ id, first_name, last_name }: UserType) =>
            ({
                value: id ? +id : 0,
                label: `${first_name ?? ''} ${last_name ?? ''}`,
            } ?? [])
    )

    const initialTeamLeader = {
        value: initialData?.teamLeaderId ?? 0,
        label: initialData?.teamLeaderName ?? '',
    }

    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            teamName: initialData?.title ?? '',
            teamLeader: initialTeamLeader,
            teamDescription: initialData?.description ?? '',
        },
    })

    useEffect(() => {
        reset({
            teamName: initialData?.title ?? '',
            teamLeader: initialTeamLeader,
            teamDescription: initialData?.description ?? '',
        })
    }, [initialData])

    const onSubmit = (data: FormValues): void => {
        const { teamName, teamLeader, teamDescription } = data

        let valid = true
        const dataFields = [
            { key: 'teamName', display: 'Team Name' },
            { key: 'teamLeader', display: 'Team Leader' },
            { key: 'teamDescription', display: 'Team Description' },
        ]

        const errorFields = { teamName: '', teamLeader: '', teamDescription: '' }

        dataFields.forEach((field) => {
            const key = field.key as keyof typeof data

            if (!data[key] || (key === 'teamLeader' && data.teamLeader.value === 0)) {
                valid = false
                errorFields[key] = `${field.display} must not be empty`
            }
        })

        if (valid) {
            if (initialData) {
                const { title, teamLeaderId, description: init_desc } = initialData
                if (
                    title === teamName &&
                    teamLeaderId === +teamLeader.value &&
                    init_desc === teamDescription
                ) {
                    errorNotify('No changes were made!')
                    closeModal()
                    return
                }

                updateTeam({
                    variables: {
                        id: initialData.id,
                        name: teamName,
                        description: teamDescription,
                        user_id: teamLeader.value,
                    },
                })
                    .then(({ data }: FetchResult<{ updateTeam: { id: number; slug: string } }>) => {
                        successNotify('Team updated successfully')
                        refetch()
                    })
                    .catch(() => {
                        errorNotify('Error updating team')
                    })
                    .finally(() => {
                        closeModal()
                        reset()
                    })
            } else {
                createTeam({
                    variables: {
                        name: teamName,
                        description: teamDescription,
                        user_id: teamLeader.value,
                    },
                })
                    .then(({ data }: FetchResult<{ createTeam: { id: number; slug: string } }>) => {
                        successNotify('Team created successfully')
                        refetch()
                    })
                    .catch(() => {
                        errorNotify('Error creating team')
                    })
                    .finally(() => {
                        closeModal()
                        reset()
                    })
            }
        }
        setFormErrors(errorFields)
    }

    return (
        <Modal
            title={formTitle}
            submitLabel={formTitle}
            isOpen={isOpen}
            handleClose={() => {
                closeModal()
                reset({
                    teamName: initialData?.title ?? '',
                    teamLeader: initialTeamLeader,
                    teamDescription: initialData?.description ?? '',
                })
                setFormErrors({ teamName: '', teamLeader: '', teamDescription: '' })
            }}
        >
            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                        control={control}
                        name="teamName"
                        defaultValue={initialData?.title ?? ''}
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                name="teamName"
                                label="Team Name"
                                placeholder="Team Name"
                                value={value}
                                onChange={onChange}
                                isValid={formErrors.teamName.length === 0}
                                error={formErrors.teamName}
                            />
                        )}
                    />
                </div>
                <div>
                    <Controller
                        control={control}
                        name="teamLeader"
                        defaultValue={initialTeamLeader}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                name="teamLeader"
                                label="Team Leader"
                                options={teamLeaders}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                    {formErrors.teamLeader.length > 0 && (
                        <span className="ml-2 text-xs text-primary-900">
                            {formErrors.teamLeader}
                        </span>
                    )}
                </div>
                <div>
                    <Controller
                        control={control}
                        name="teamDescription"
                        defaultValue={initialData?.description ?? ''}
                        render={({ field: { onChange, value } }) => (
                            <TextArea
                                name="teamDescription"
                                value={value}
                                label="Team Description"
                                onChange={onChange}
                                isValid={formErrors.teamDescription.length === 0}
                                error={formErrors.teamDescription}
                            />
                        )}
                    />
                </div>
            </form>
        </Modal>
    )
}
export default TeamsFormModal
