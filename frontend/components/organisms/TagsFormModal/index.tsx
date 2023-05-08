import InputField from '@/components/atoms/InputField'
import TextArea from '@/components/atoms/TextArea'
import Modal from '@/components/templates/Modal'
import CREATE_TAG from '@/helpers/graphql/mutations/create_tag'
import UPDATE_TAG from '@/helpers/graphql/mutations/update_tag'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
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
    const [modalButtonLoading, setModalButtonLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({ name: '', description: '' })
    const [tagName, setTagName] = useState(initialData?.name ?? '')
    const [tagDescription, setTagDescription] = useState(initialData?.description ?? '')

    const [createTag] = useMutation(CREATE_TAG)
    const [updateTag] = useMutation(UPDATE_TAG)

    useEffect(() => {
        setTagName(initialData?.name ?? '')
        setTagDescription(initialData?.description ?? '')
    }, [initialData, refetchHandler])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            tagName: { value: string }
            tagDescription: { value: string }
        }

        let valid = true
        const name = target.tagName.value
        const description = target.tagDescription.value
        const errorFields = { name: '', description: '' }

        if (name === '') {
            valid = false
            errorFields.name = `Name must not be empty`
        }

        if (description === '') {
            valid = false
            errorFields.description = `Description must not be empty`
        }

        if (valid) {
            if (formTitle === 'Add Tag') {
                setModalButtonLoading(true)
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
                        reset()
                    })
                    .catch((e) => {
                        errorNotify(e.message)
                    })
                    .finally(() =>
                        setTimeout(() => {
                            setModalButtonLoading(false)
                        }, 500)
                    )
            } else {
                if (initialData.name === name && initialData.description === description) {
                    errorNotify('No changes were made!')
                } else {
                    setModalButtonLoading(true)
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
                        .finally(() =>
                            setTimeout(() => {
                                setModalButtonLoading(false)
                            }, 500)
                        )
                }
            }
        }
        setFormErrors(errorFields)
    }

    const reset = (): void => {
        setTagName(initialData?.name ?? '')
        setTagDescription(initialData?.description ?? '')
        setFormErrors({ name: '', description: '' })
    }

    return (
        <Modal
            title={formTitle}
            submitLabel={formTitle}
            loading={modalButtonLoading}
            isOpen={isOpen}
            handleClose={() => {
                closeModal()
                reset()
            }}
        >
            <form className="flex w-full flex-col gap-4 " onSubmit={onSubmit}>
                <InputField
                    name="tagName"
                    label="Tag Name"
                    value={tagName}
                    placeholder="Tag Name"
                    onChange={(e) => {
                        setTagName(e.target.value)
                    }}
                    isValid={formErrors.name.length === 0}
                    error={formErrors.name}
                />
                <TextArea
                    name="tagDescription"
                    value={tagDescription}
                    label="Tag Description"
                    onChange={(e) => {
                        setTagDescription(e.target.value)
                    }}
                    isValid={formErrors.description.length === 0}
                    error={formErrors.description}
                />
            </form>
        </Modal>
    )
}
export default TagsFormModal
