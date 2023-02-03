import React, { useEffect, useState } from 'react'
import TagsInput, { ITag } from '../../molecules/TagsInput'
import QuestionFormSchema from './schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjectEmpty } from '@/utils'
import FormAlert from '@/components/molecules/FormAlert'
import Button from '@/components/atoms/Button'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import CREATE_QUESTION from '@/helpers/graphql/mutations/create_question'
import { useMutation } from '@apollo/client'
import { successNotify } from '@/helpers/toast'
import { useRouter } from 'next/router'

export type FormValues = {
    title: string
    description: string
    tags: ITag[]
}

const QuestionForm = (): JSX.Element => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(QuestionFormSchema),
    })
    const [isDisableSubmit, setIsDisableSubmit] = useState(false)

    const router = useRouter()

    const [createQuestion] = useMutation(CREATE_QUESTION)

    const onSubmit = (data: FormValues) => {
<<<<<<< HEAD
        setIsDisableSubmit(true)

        const tags = data.tags.map((tag) => tag.id)

        const newQuestion = createQuestion({
            variables: {
                title: data.title,
                content: data.description,
                is_public: true,
                tags,
                team_id: 1,
            },
        })

        successNotify('Question Added Successfully')

        newQuestion.then((data: any) => {
            const slug = data.data.createQuestion.slug
            router.replace(`/questions/${slug}`)
        })

        setTimeout(() => {
            setIsDisableSubmit(false)
        }, 4000)
=======
        if (isObjectEmpty(errors)) {
            //Replace with graphql post request
        }
>>>>>>> [Overflow-14] Implement API to sidebars
    }

    useEffect(() => {
        register('description', {})
        setValue('description', '')
        register('tags', {})
        setValue('tags', [])
    }, [register])

    return (
        <div className="w-full">
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
                    <RichTextEditor setValue={setValue} usage="description" id="descriptionInput" />
                </div>
                <div className="Tags w-full self-center py-4">
                    <label htmlFor="tagsInput" className="text-2xl font-bold">
                        Tags (max. 5)
                    </label>
                    <div className="w-1/2">
                        <TagsInput setValue={setValue} />
                    </div>
                </div>
                {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
                <div className="Submit w-full self-center py-4">
                    <div className="float-right">
                        <Button
                            usage="primary"
                            type="submit"
                            onClick={undefined}
                            additionalClass="px-10 bg-white"
                            isDisabled={isDisableSubmit}
                        >
                            Post Question
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QuestionForm
