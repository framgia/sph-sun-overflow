import React, { useEffect } from 'react'
import TagsInput, { ITag } from '../../molecules/TagsInput'
import QuestionFormSchema from './schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { isObjectEmpty } from '@/utils'
import FormAlert from '@/components/molecules/FormAlert'
import Button from '@/components/atoms/Button'
import RichTextEditor from '@/components/molecules/RichTextEditor'
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

    const onSubmit = (data: FormValues) => {
        if (isObjectEmpty(errors)) {
            //Replace with graphql post request
            console.log(data)
        }
    }

    useEffect(() => {
        register('description', {})
        setValue('description', '')
        register('tags', {})
        setValue('tags', [])
    }, [register])

    return (
        <div className=" m-2 border-2 border-gray-500 bg-gray-50 md:w-2/5 lg:w-1/2 ">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="QuestionTitle w-4/5 self-center py-4">
                    <label htmlFor="titleInput" className="mb-2 font-bold">
                        Question Title
                    </label>
                    <input
                        id="titleInput"
                        type="text"
                        className={`w-full rounded-lg border-2 border-gray-400`}
                        {...register('title', {})}
                    />
                </div>
                <div className="Description mb-8 w-4/5 self-center py-4">
                    <label htmlFor="descriptionInput" className="mb-2 font-bold">
                        Description
                    </label>
                    <RichTextEditor setValue={setValue} usage="description" id="descriptionInput" />
                </div>
                <div className="Tags w-4/5 self-center py-4">
                    <label htmlFor="tagsInput" className="font-bold ">
                        Tags (max. 5)
                    </label>
                    <TagsInput setValue={setValue} />
                </div>
                {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
                <div className="Submit w-4/5 self-center py-4">
                    <div className="float-right">
                        <Button
                            usage="primary"
                            type="submit"
                            onClick={undefined}
                            additionalClass=""
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
