import Dropdown from '@/components/molecules/Dropdown'
import Modal from '@/components/templates/Modal'
import { Controller, useForm } from 'react-hook-form'
import type { OptionType } from '../../molecules/Dropdown/index'

const tempData = {
    title: '',
    description: '',
}

type FormProps = {
    initialData?: {
        title: string
        description: string
    }
    closeModal: () => void
    isOpen: boolean
}

const TeamsFormModal = ({ initialData = tempData, isOpen, closeModal }: FormProps): JSX.Element => {
    const formTitle = initialData?.title ? 'Edit Team' : 'Add Team'

    const { control } = useForm<{ teamLeader: number }>({})

    const teamLeaders: OptionType[] = [
        {
            id: 1,
            name: 'John Doe',
        },
        {
            id: 2,
            name: 'James Bow',
        },
        {
            id: 3,
            name: 'Jane Dough',
        },
    ]

    return (
        <Modal
            title={formTitle}
            submitLabel={formTitle}
            isOpen={isOpen}
            handleClose={() => {
                closeModal()
            }}
        >
            <form className="flex w-full flex-col gap-4 ">
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        id="teamName"
                        className="rounded-lg"
                        placeholder="Name"
                        defaultValue={initialData.title || ''}
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
                        defaultValue={initialData.description || ''}
                        rows={4}
                    />
                </div>
            </form>
        </Modal>
    )
}
export default TeamsFormModal
