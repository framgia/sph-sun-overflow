import Button from '@/components/atoms/Button'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import { successNotify, errorNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import UPDATE_TEAM_DASHBOARD from '../../../helpers/graphql/mutations/update_team_dashboard'

type DashboardContentFormValues = {
    content: string
}

type Props = {
    teamId: number
    content: string
    toggleEdit: () => void
}

const DashboardEditContentForm = ({ teamId, content, toggleEdit }: Props): JSX.Element => {
    const [inputError, setInputError] = useState({ content: '' })
    const errorElement = document.querySelector('#contentInput .ql-container') as HTMLDivElement

    const [updateTeamDashboard] = useMutation(UPDATE_TEAM_DASHBOARD)

    const { register, setValue, handleSubmit, control } = useForm<DashboardContentFormValues>({
        defaultValues: {
            content: content ?? '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const onSubmit = async (data: DashboardContentFormValues) => {
        const cleanContent = data.content.replace(/<\/?[^>]+(>|$)/g, '')
        if (cleanContent.length <= 0) {
            setInputError({ ...inputError, content: 'Content must not be empty' })
            return
        }

        setInputError({ ...inputError, content: '' })
        if (data.content === content) {
            errorNotify('No changes. Dashboard not updated')
            toggleEdit()
            return
        }

        try {
            await updateTeamDashboard({
                variables: {
                    id: teamId,
                    dashboard_content: data.content,
                },
            })
            successNotify('Dashboard updated successfully')
            toggleEdit()
        } catch (e) {
            errorNotify('There was an error updating')
        }
    }

    useEffect(() => {
        if (errorElement) {
            if (inputError.content.length > 0) {
                errorElement.classList.add('error-form-element')
            } else {
                errorElement.classList.remove('error-form-element')
            }
        }
    }, [inputError, errorElement])

    return (
        <div className="flex w-full flex-col gap-6 py-6">
            <div className="flex shrink">
                <div className="text-primary-gray">
                    <Button usage="back-button" onClick={toggleEdit}>
                        <span className="text-base">{'<'} Go Back</span>
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full flex-col content-center gap-2 pl-5">
                    <div className="text-2xl">Edit Content</div>
                    <div className="flex flex-col">
                        <div className="flex w-full flex-1 flex-col gap-1 pb-12">
                            <label htmlFor="contentInput" className="text-xl font-bold">
                                Content
                            </label>
                            <Controller
                                control={control}
                                name="content"
                                render={({ field: { onChange, value } }) => (
                                    <RichTextEditor
                                        onChange={onChange}
                                        value={value}
                                        usage="dashboard"
                                        id="contentInput"
                                    />
                                )}
                            />
                            <div className="text-sm text-primary-red">{inputError.content}</div>
                        </div>
                    </div>
                    <div className="mt-[-3rem] flex flex-row justify-end">
                        <Button usage="primary">Update Content</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DashboardEditContentForm
