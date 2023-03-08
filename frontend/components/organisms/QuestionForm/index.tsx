import Button from '@/components/atoms/Button'
import FormAlert from '@/components/molecules/FormAlert'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import SortDropdown from '@/components/molecules/SortDropdown'
import { FilterType } from '@/components/templates/QuestionPageLayout'
import CREATE_QUESTION from '@/helpers/graphql/mutations/create_question'
import UPDATE_QUESTION from '@/helpers/graphql/mutations/update_question'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { TeamType } from '@/pages/questions/[slug]'
import { isObjectEmpty } from '@/utils'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TagsInput, { ITag } from '../../molecules/TagsInput'
import QuestionFormSchema from './schema'
export type FormValues = {
    title: string
    description: string
    tags: ITag[]
    is_public: boolean
    team_id: TeamType | null
}

type QuestionSkeleton = {
    id: Number | undefined
    content: String
    title: String
    tags: ITag[]
    slug: String
    is_public?: boolean
    team?: TeamType
}
interface Props {
    initialState?: QuestionSkeleton
}

const QuestionForm = ({ initialState }: Props): JSX.Element => {
    let id: Number | undefined
    let title: String | undefined
    let content: String | undefined
    let tags: ITag[] | undefined
    let is_public: boolean | undefined
    let team: TeamType | undefined

    if (initialState) {
        ;({ id, content, title, tags, is_public, team } = initialState)
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
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: title ? String(title) : '',
            description: content ? String(content) : '',
            tags: tags ? tags : [],
            is_public,
            team_id: team,
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(QuestionFormSchema),
    })
    const [isDisableSubmit, setIsDisableSubmit] = useState(false)

    const [createQuestion] = useMutation(CREATE_QUESTION)
    const [updateQuestion] = useMutation(UPDATE_QUESTION)

    const [selectedFilter, setSelectedFilter] = useState(team ? team.name : '')

    const tempTeams = useBoundStore.getState().teams

    const transformTeams = () => {
        return tempTeams.map(({ team: { id, name } }) => {
            return {
                id,
                name,
                onClick: () => {
                    setValue('team_id', { id: id, name: name })
                    setValue('is_public', true)
                    setSelectedFilter(name)
                },
            } as FilterType
        })
    }

    const validateChanges = (data: FormValues) => {
        if (data.title != initialState?.title) {
            return false
        }
        if (data.description !== initialState?.content) {
            return false
        }
        if (data.is_public != initialState?.is_public) {
            return false
        }
        if (data?.team_id?.id !== initialState?.team?.id) {
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
                    is_public: data.is_public,
                    tags,
                    team_id: data?.team_id?.id,
                },
            })
        } else {
            let status = !data.team_id ? true : data.is_public
            let team = data.team_id?.id ?? null
            newQuestion = createQuestion({
                variables: {
                    title: data.title,
                    content: data.description,
                    is_public: status,
                    tags,
                    team_id: team,
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
                    <label htmlFor="titleInput" className="mb-2 text-2xl">
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
                    <label htmlFor="descriptionInput" className="mb-2 text-2xl">
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

                <div className="flex w-full flex-row  space-x-10 py-4">
                    <div className="Tags w-1/2 self-center py-4">
                        <label htmlFor="tagsInput" className="text-2xl">
                            Tags (max. 5)
                        </label>
                        <Controller
                            control={control}
                            name="tags"
                            render={({ field: { value } }) => (
                                <TagsInput setValue={setValue} value={value} />
                            )}
                        />
                    </div>
                    <div className="flex flex-col  self-center">
                        <label className="text-2xl">Teams</label>
                        <div className="w-40">
                            <Controller
                                control={control}
                                name="team_id"
                                render={({ field: { value } }) => {
                                    const teams = transformTeams()

                                    return (
                                        <SortDropdown
                                            filters={teams}
                                            selectedFilter={selectedFilter}
                                        />
                                    )
                                }}
                            />
                        </div>
                    </div>
                    {watch('team_id') && (
                        <div className="flex flex-col items-center self-center">
                            <label htmlFor="isPublic" className="text-2xl font-bold">
                                Public
                            </label>
                            <div className="">
                                <input
                                    type="checkbox"
                                    id="isPublic"
                                    {...register('is_public')}
                                    className=" mt-1 aspect-square h-full "
                                    style={{ boxShadow: 'none' }}
                                />
                            </div>
                        </div>
                    )}
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
