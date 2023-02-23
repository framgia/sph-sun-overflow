import React, { useState } from 'react'
import TagsInput, { ITag } from '../../molecules/TagsInput'
import QuestionFormSchema from './schema'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjectEmpty } from '@/utils'
import FormAlert from '@/components/molecules/FormAlert'
import Button from '@/components/atoms/Button'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import CREATE_QUESTION from '@/helpers/graphql/mutations/create_question'
import UPDATE_QUESTION from '@/helpers/graphql/mutations/update_question'
import { useMutation } from '@apollo/client'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useRouter } from 'next/router'
import isEqual from 'lodash/isEqual'
export type FormValues = {
    title: string
    description: string
    tags: ITag[]
}
type QuestionSkeleton = {
    id: Number | undefined
    content: String
    title: String
    tags: ITag[]
    slug: String
}
interface Props {
    initialState?: QuestionSkeleton
}

const QuestionForm = ({ initialState }: Props): JSX.Element => {
    let id: Number | undefined
    let title: String | undefined
    let content: String | undefined
    let tags: ITag[] | undefined
    if (initialState) {
        ;({ id, content, title, tags } = initialState)
    }
    const router = useRouter()
    let buttonText = 'Post Question'
    let formTitle = 'Post a Question'
    let successMessage = 'Question Added Successfully'
    let errorMessage = 'Question Not Updated'
    if (router.query.slug) {
        buttonText = 'Save Edits'
        formTitle = 'Edit Question'
        successMessage = 'Question Updated Successfully'
    }

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: title ? String(title) : '',
            description: content ? String(content) : '',
            tags: tags ? tags : [],
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(QuestionFormSchema),
    })
    const [isDisableSubmit, setIsDisableSubmit] = useState(false)

    const [createQuestion] = useMutation(CREATE_QUESTION)
    const [updateQuestion] = useMutation(UPDATE_QUESTION)

    const validateChanges = (data: FormValues) => {
        if (data.title != initialState?.title) {
            return false
        }
        if (data.description !== initialState?.content) {
            return false
        }
        if (
            !isEqual(
                data.tags.map((tag) => Number(tag.id)),
                initialState.tags.map((tag) => Number(tag.id))
            )
        ) {
            return false
        }
        return true
    }

    const onSubmit = (data: FormValues) => {
        setIsDisableSubmit(true)
        const tags = data.tags.map((tag) => tag.id)

        if (initialState?.slug && validateChanges(data)) {
            router.replace(`/questions/${initialState.slug}`)
            errorNotify(errorMessage)
            return
        }

        let newQuestion
        if (id) {
            newQuestion = updateQuestion({
                variables: {
                    id: id,
                    title: data.title,
                    content: data.description,
                    tags,
                },
            })
        } else {
            newQuestion = createQuestion({
                variables: {
                    title: data.title,
                    content: data.description,
                    is_public: true,
                    tags,
                    team_id: 1,
                },
            })
        }

        successNotify(successMessage)

        newQuestion.then((data: any) => {
            let slug
            if (id) {
                slug = data.data.updateQuestion.slug
            } else {
                slug = data.data.createQuestion.slug
            }
            router.replace(`/questions/${slug}`)
        })

        setTimeout(() => {
            setIsDisableSubmit(false)
        }, 4000)
    }

    return (
        <div className="w-full">
            <div className="mb-2 text-3xl">{formTitle}</div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="QuestionTitle w-full self-center py-4">
                    <label htmlFor="titleInput" className="mb-2 text-2xl font-bold">
                        Question Title
                    </label>
                    <input
                        id="titleInput"
                        type="text"
                        className={`w-full rounded-lg border-2 border-gray-400 bg-white`}
                        {...register('title', {})}
                    />
                </div>
                <div className="Description mb-8 w-full self-center py-4">
                    <label htmlFor="descriptionInput" className="mb-2 text-2xl font-bold">
                        Description
                    </label>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <RichTextEditor
                                onChange={onChange}
                                value={value}
                                usage="description"
                                id="descriptionInput"
                            />
                        )}
                    />
                </div>
                <div className="Tags w-full self-center py-4">
                    <label htmlFor="tagsInput" className="text-2xl font-bold">
                        Tags (max. 5)
                    </label>
                    <div className="w-1/2">
                        <Controller
                            control={control}
                            name="tags"
                            render={({ field: { value } }) => (
                                <TagsInput setValue={setValue} value={value} />
                            )}
                        />
                    </div>
                </div>
                {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
                <div className="Submit w-full self-center py-4">
                    <div className="float-right">
                        <Button
                            usage="primary"
                            type="submit"
                            onClick={undefined}
                            additionalClass={`px-10 ${
                                isDisableSubmit ? 'bg-light-red hover:bg-light-red' : 'bg-white'
                            }`}
                            isDisabled={isDisableSubmit}
                        >
                            {buttonText}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QuestionForm
