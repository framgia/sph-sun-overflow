import Dropdown from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import CREATE_TEAM from '@/helpers/graphql/mutations/create_team'
import UPDATE_TEAM from '@/helpers/graphql/mutations/update_team'
import GET_ALL_TEAM_LEADERS from '@/helpers/graphql/queries/get_all_team_leaders'
import type { UserType } from '@/pages/questions/[slug]'
import type { FetchResult } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client'
import { Input, Textarea } from '@material-tailwind/react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { errorNotify, successNotify } from '../../../helpers/toast'
import type { OptionType } from '../../molecules/Dropdown/index'

type FormProps = {
    initialData?: {
        id: number
        title: string
        teamLeaderId: number
        description: string
    }
    isOpen: boolean
    closeModal: () => void
    refetch: () => void
}

type FormValues = {
    teamName: string
    teamLeader: number
    teamDescription: string
}

const TeamsFormModal = ({ initialData, isOpen, closeModal, refetch }: FormProps): JSX.Element => {
    const router = useRouter()
    const formTitle = initialData?.title ? 'Edit Team' : 'Add Team'

    const { handleSubmit, control } = useForm<FormValues>({})
    const { data } = useQuery(GET_ALL_TEAM_LEADERS)
    const [createTeam] = useMutation(CREATE_TEAM)
    const [updateTeam] = useMutation(UPDATE_TEAM)

    const teamLeaders: OptionType[] = data?.teamLeaders.map(
        ({ id, first_name, last_name }: UserType) => ({
            id,
            name: `${first_name ?? ''} ${last_name ?? ''}`,
        })
    )

    const onSubmit = (data: FormValues): void => {
        const { teamName, teamLeader, teamDescription } = data

        if (!(teamName && teamLeader && teamDescription)) {
            errorNotify('Please input some data')
            return
        }

        if (initialData) {
            const { title, teamLeaderId, description: init_desc } = initialData
            if (
                title === teamName &&
                teamLeaderId === +teamLeader &&
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
                    user_id: teamLeader,
                },
            })
                .then(({ data }: FetchResult<{ updateTeam: { id: number; slug: string } }>) => {
                    successNotify('Team updated successfully')
                    refetch()
                    void router.push(`teams/${data?.updateTeam.slug ?? ''}`)
                })
                .catch(() => {
                    errorNotify('Error updating team')
                })
                .finally(() => {
                    closeModal()
                })
        } else {
            createTeam({
                variables: {
                    name: teamName,
                    description: teamDescription,
                    user_id: teamLeader,
                },
            })
                .then(({ data }: FetchResult<{ createTeam: { id: number; slug: string } }>) => {
                    successNotify('Team created successfully')
                    refetch()
                    void router.push(`teams/${data?.createTeam.slug ?? ''}`)
                })
                .catch(() => {
                    errorNotify('Error creating team')
                })
                .finally(() => {
                    closeModal()
                })
        }
    }

    return (
        <Modal
            title={formTitle}
            submitLabel={formTitle}
            isOpen={isOpen}
            handleClose={() => {
                closeModal()
            }}
        >
            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="teamName"
                    defaultValue={initialData?.title ?? ''}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            id="teamName"
                            name="teamName"
                            label="Name"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="teamLeader"
                    defaultValue={initialData?.teamLeaderId}
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

                <Controller
                    control={control}
                    name="teamDescription"
                    defaultValue={initialData?.description ?? ''}
                    render={({ field: { onChange, value } }) => (
                        <Textarea
                            id="teamDescription"
                            name="teamDescription"
                            label="Description"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </form>
        </Modal>
    )
}
export default TeamsFormModal
