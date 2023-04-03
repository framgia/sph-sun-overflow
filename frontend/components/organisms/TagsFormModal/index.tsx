import Modal from '@/components/templates/Modal'
import CREATE_TAG from '@/helpers/graphql/mutations/create_tag'
import UPDATE_TAG from '@/helpers/graphql/mutations/update_tag'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import { Input, Textarea } from '@material-tailwind/react'
import React from 'react'
const tempData = {
    id: 0,
    name: '',
    description: '',
}

type FormProps = {
    initialData?: {
        id: number
        name: string
        description: string
    }
    closeModal: () => void
    isOpen: boolean
    refetchHandler: () => void
}

const TagsFormModal = ({
    initialData = tempData,
    isOpen,
    closeModal,
    refetchHandler,
}: FormProps): JSX.Element => {
    const formTitle = initialData?.name ? 'Edit Tag' : 'Add Tag'
    const [createTag] = useMutation(CREATE_TAG)
    const [updateTag] = useMutation(UPDATE_TAG)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        const target = e.target as typeof e.target & {
            tagName: { value: string }
            tagDescription: { value: string }
        }
        const name = target.tagName.value
        const description = target.tagDescription.value

        if (name === '' || description === '') {
            errorNotify('Please input some data')
        } else {
            if (formTitle === 'Add Tag') {
                createTag({
                    variables: {
                        name,
                        description,
                    },
                })
                    .then(() => {
                        successNotify('Tag Successfully Added!')
                        refetchHandler()
                        closeModal()
                    })
                    .catch((e) => {
                        errorNotify(e.message)
                    })
            } else {
                if (initialData.name === name && initialData.description === description) {
                    errorNotify('Tag is not updated!')
                    closeModal()
                } else {
                    updateTag({
                        variables: {
                            id: initialData?.id,
                            name,
                            description,
                        },
                    })
                        .then(() => {
                            successNotify('Tag Successfully Updated!')
                            refetchHandler()
                            closeModal()
                        })
                        .catch((e) => {
                            errorNotify(e.message)
                        })
                }
            }
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
            <form className="flex w-full flex-col gap-4 " onSubmit={onSubmit}>
                <Input
                    id="tagName"
                    name="tagName"
                    label="Name"
                    defaultValue={initialData.name || ''}
                />
                <Textarea
                    id="tagDescription"
                    name="tagDescription"
                    label="Description"
                    defaultValue={initialData.description || ''}
                />
            </form>
        </Modal>
    )
}
export default TagsFormModal
