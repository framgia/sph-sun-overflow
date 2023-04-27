import Button from '@/components/atoms/Button'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import { errorNotify, successNotify } from '@/helpers/toast'
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

    const { handleSubmit, control } = useForm<DashboardContentFormValues>({
        defaultValues: {
            content: content ?? '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const onSubmit = async (data: DashboardContentFormValues): Promise<void> => {
        const cleanContent = data.content.replace(/<\/?[^>]+(>|$)/g, '')
        if (cleanContent.length <= 0) {
            setInputError({ ...inputError, content: 'Content must not be empty' })
            return
        }

        setInputError({ ...inputError, content: '' })
        if (data.content === content) {
            errorNotify('No changes were made')
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col content-center gap-2">
                <label htmlFor="contentInput" className="text-sm font-medium text-neutral-900">
                    Dashboard Content
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
                <div className="text-xs text-primary-900">{inputError.content}</div>
                <div className="flex flex-row justify-end gap-2">
                    <Button usage="grayed" onClick={toggleEdit}>
                        Cancel
                    </Button>
                    <Button usage="stroke">Save</Button>
                </div>
            </div>
        </form>
    )
}

export default DashboardEditContentForm
