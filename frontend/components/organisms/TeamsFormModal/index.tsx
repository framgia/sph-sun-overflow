import Dropdown from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import CREATE_TEAM from '@/helpers/graphql/mutations/create_team'
import UPDATE_TEAM from '@/helpers/graphql/mutations/update_team'
import GET_ALL_TEAM_LEADERS from '@/helpers/graphql/queries/get_all_team_leaders'
import type { UserType } from '@/pages/questions/[slug]'
import type { FetchResult } from '@apollo/client'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { errorNotify, successNotify } from '../../../helpers/toast'
import type { OptionType } from '../../molecules/Dropdown/index'

type FormProps = {
    initialData?: {
        id: number
        title: string
        description: string
    }
    isOpen: boolean
    closeModal: () => void
    refetch: () => void
}

const TeamsFormModal = ({ initialData, isOpen, closeModal, refetch }: FormProps): JSX.Element => {
    const router = useRouter()
    const formTitle = initialData?.title ? 'Edit Team' : 'Add Team'

    const { control } = useForm<{ teamLeader: number }>({})
    const { data } = useQuery(GET_ALL_TEAM_LEADERS)
    const [createTeam] = useMutation(CREATE_TEAM)
    const [updateTeam] = useMutation(UPDATE_TEAM)

    const teamLeaders: OptionType[] = data?.teamLeaders.map(
        ({ id, first_name, last_name }: UserType) => ({
            id,
            name: `${first_name ?? ''} ${last_name ?? ''}`,
        })
    )

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        const target = e.target as typeof e.target & {
            teamName: { value: string }
            teamLeader: { value: number }
            teamDescription: { value: string }
        }

        const name = target.teamName.value
        const description = target.teamDescription.value
        const user_id = target.teamLeader.value

        if (!(name && description)) {
            errorNotify('Please input some data')
            return
        }

        if (initialData) {
            const { title, description: init_desc } = initialData
            if (title === name && init_desc === description) {
                errorNotify('No changes were made!')
                closeModal()
                return
            }

            updateTeam({
                variables: {
                    id: initialData.id,
                    name,
                    description,
                    user_id,
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
                    name,
                    description,
                    user_id,
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
            <form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        id="teamName"
                        className="rounded-lg"
                        placeholder="Name"
                        defaultValue={initialData?.title ?? ''}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-bold">Team Leader</span>
                    <Controller
                        control={control}
                        name="teamLeader"
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                name="teamLeader"
                                label=""
                                options={teamLeaders}
                                onChange={onChange}
                                value={value}
                            />
                        )}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <textarea
                        id="teamDescription"
                        className="rounded-lg"
                        placeholder="Briefly Describe the Team"
                        defaultValue={initialData?.description ?? ''}
                        rows={4}
                    />
                </div>
            </form>
        </Modal>
    )
}
export default TeamsFormModal
