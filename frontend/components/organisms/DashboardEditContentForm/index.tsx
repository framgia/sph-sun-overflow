import Button from '@/components/atoms/Button'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type DashboardContentFormValues = {
    content: string
}

type Props = {
    content: string
    toggleEdit: () => void
}

const DashboardEditContentForm = ({ content, toggleEdit }: Props): JSX.Element => {
    const [inputError, setInputError] = useState({ content: '' })
    const errorElement = document.querySelector('#contentInput .ql-container') as HTMLDivElement

    const { register, setValue, handleSubmit, control } = useForm<DashboardContentFormValues>({
        defaultValues: {
            content: content ?? '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const onSubmit = (data: DashboardContentFormValues) => {
        const cleanContent = data.content.replace(/<\/?[^>]+(>|$)/g, '')
        if (cleanContent.length <= 0) {
            setInputError({ ...inputError, content: 'Content must not be empty' })
            return
        }

        setInputError({ ...inputError, content: '' })
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
        <div className="flex w-full flex-col gap-6 pt-6">
            <div className="flex shrink">
                <div className="text-xl text-primary-gray">
                    <Button usage="back-button" onClick={toggleEdit}>
                        {'< Go Back'}
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full flex-col content-center gap-5 pl-5">
                    <div className="text-3xl">Edit Content</div>
                    <div className="flex flex-col">
                        <div className="flex w-full flex-col gap-3 pb-12">
                            <label htmlFor="contentInput" className="text-2xl font-bold">
                                Content
                            </label>
                            <Controller
                                control={control}
                                name="content"
                                render={({ field: { onChange, value } }) => (
                                    <RichTextEditor
                                        onChange={onChange}
                                        value={value}
                                        usage="description"
                                        id="contentInput"
                                    />
                                )}
                            />
                        </div>
                        {inputError.content && (
                            <div className="px-3 text-sm text-primary-red">
                                {inputError.content}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-end">
                        <Button usage="primary">Update Content</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default DashboardEditContentForm
