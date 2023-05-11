import Button from '@/components/atoms/Button'
import EditorPreview from '@/components/molecules/EditorPreview'
import FormAlert from '@/components/molecules/FormAlert'
import PreviewToggle from '@/components/molecules/PreviewToggle'
import PublicToggle from '@/components/molecules/PublicToggle'
import RichTextEditor from '@/components/molecules/RichTextEditor'
import SortDropdown from '@/components/molecules/SortDropdown'
import type { FilterType } from '@/components/templates/QuestionsPageLayout'
import CREATE_QUESTION from '@/helpers/graphql/mutations/create_question'
import UPDATE_QUESTION from '@/helpers/graphql/mutations/update_question'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import type { TeamType } from '@/pages/questions/[slug]'
import { isObjectEmpty } from '@/utils'
import { useMutation, type ApolloQueryResult } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'
import isEqual from 'lodash/isEqual'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { ITag } from '../../molecules/TagsInput'
import TagsInput from '../../molecules/TagsInput'
import QuestionFormSchema from './schema'
export type FormValues = {
    title: string
    description: string
    tags: ITag[]
    team_id?: number | null
    is_public?: boolean
}

type QuestionSkeleton = {
    id: number | undefined
    content: string
    title: string
    tags: ITag[]
    slug: string
    team?: TeamType
    is_public?: boolean
}
interface Props {
    initialState?: QuestionSkeleton
    tagData: { tagSuggest: ITag[] }
    refetch: (input: { queryString: string }) => Promise<ApolloQueryResult<any>>
}

export const parseImage = (value: string): string => {
    const replacedStr = value.replace(
        /<span\s+data-src="([^"]+)"\s+data-alt="([^"]+)">!image\(([^)]+)\)<\/span>/gi,
        '<img src="$3" alt="$2">'
    )
    return replacedStr
}

const minimizeImage = (value: string): string => {
    const imgRegex = /<img.*?src="(.+?)".*?>/g
    return value.replace(imgRegex, '<span data-src="$1" data-alt="$1">!image($1)</span>')
}

const QuestionForm = ({ initialState, tagData, refetch }: Props): JSX.Element => {
    let id: number | undefined
    let title: string | undefined
    let content: string | undefined
    let tags: ITag[] | undefined
    let is_public: boolean | undefined
    let team: TeamType | undefined

    if (initialState) {
        initialState.content = minimizeImage(initialState.content)
        ;({ id, content, title, tags, is_public, team } = initialState)
    }

    const router = useRouter()
    const [isPreview, setIsPreview] = useState<boolean>(false)
    const queryTeamId = isNaN(parseInt(router.query.id as string))
        ? undefined
        : parseInt(router.query.id as string)
    let buttonText = 'Submit Question'
    let successMessage = 'Question Added Successfully'
    const errorMessage = 'Question Not Updated'
    if (router.query.slug) {
        buttonText = 'Save Edits'
        successMessage = 'Question Updated Successfully'
    }
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormValues>({
        defaultValues: {
            title: title ? String(title) : '',
            description: content ? String(content) : '',
            tags: tags ?? [],
            is_public: is_public ?? true,
            team_id: team?.id ?? queryTeamId,
        },
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(QuestionFormSchema),
    })
    const hasTeam = watch('team_id')

    let initial_team_name
    initial_team_name = team ? team.name : ''
    initial_team_name = initial_team_name || (router.query.team ?? 'Select Teams')

    const [createQuestion] = useMutation(CREATE_QUESTION)
    const [updateQuestion] = useMutation(UPDATE_QUESTION)
    const [selectedFilter, setSelectedFilter] = useState(initial_team_name)

    const refetchTags = async (queryText: string): Promise<void> => {
        await refetch({ queryString: `%${queryText}%` })
    }

    const tagSuggest = tagData.tagSuggest

    const tempTeams = useBoundStore.getState().teams

    const transformTeams = (): FilterType[] => {
        const teamFilters: FilterType[] = tempTeams.map(({ team: { id, name } }) => {
            return {
                id,
                name,
                onClick: () => {
                    setValue('team_id', id)
                    setValue('is_public', true)
                    setSelectedFilter(name)
                },
            }
        })

        teamFilters.unshift({
            id: 0,
            name: 'No Team',
            onClick: () => {
                setValue('team_id', undefined)
                setValue('is_public', true)
                setSelectedFilter('No Team')
            },
        })

        return teamFilters
    }

    const validateChanges = (data: FormValues): boolean => {
        if (data.title !== initialState?.title) {
            return false
        }
        if (data.description !== initialState?.content) {
            return false
        }
        if (data.is_public !== initialState?.is_public) {
            return false
        }
        if (data?.team_id !== initialState?.team?.id) {
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

    const onSubmit = async (data: FormValues): Promise<void> => {
        const tags = data.tags.map((tag) => tag.id)
        if (initialState?.slug && validateChanges(data)) {
            await router.replace(`/questions/${initialState.slug}`)
            errorNotify(errorMessage)
            return
        }
        data.description = parseImage(data.description)
        if (id) {
            await updateQuestion({
                variables: {
                    id,
                    title: data.title,
                    content: data.description,
                    is_public: data.is_public,
                    tags,
                    team_id: data?.team_id,
                },
            })
                .then(async (data) => {
                    let slug: string
                    if (id) {
                        slug = data.data.updateQuestion.slug
                    } else {
                        slug = data.data.createQuestion.slug
                    }

                    if (router.query.prev === undefined) {
                        if (initialState?.slug !== undefined) {
                            await router.push(
                                String(router.asPath).replace(
                                    `${initialState?.slug}/edit`,
                                    `${slug}`
                                )
                            )
                        } else {
                            await router.push(String(router.asPath).replace(`add`, `${slug}`))
                        }
                    } else {
                        await router.push(`/teams/${router.query.prev as string}/question/${slug}`)
                    }
                })
                .catch(() => {})
        } else {
            await createQuestion({
                variables: {
                    title: data.title,
                    content: data.description,
                    is_public: data.is_public,
                    tags,
                    team_id: data.team_id,
                },
            })
                .then(async (data) => {
                    console.log(data)
                    let slug: string
                    if (id) {
                        slug = data.data.updateQuestion.slug
                    } else {
                        slug = data.data.createQuestion.slug
                    }

                    if (router.query.prev === undefined) {
                        if (initialState?.slug !== undefined) {
                            await router.push(
                                String(router.asPath).replace(
                                    `${initialState?.slug}/edit`,
                                    `${slug}`
                                )
                            )
                        } else {
                            await router.push(String(router.asPath).replace(`add`, `${slug}`))
                        }
                    } else {
                        await router.push(`/teams/${router.query.prev as string}/question/${slug}`)
                    }
                })
                .catch(() => {})
        }

        successNotify(successMessage)
    }
    return (
        <div className="w-[888px] p-4">
            <form className="flex flex-col gap-10 " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 ">
                    <div className="QuestionTitle flex w-full flex-col gap-1 self-center">
                        <label
                            htmlFor="titleInput"
                            className="text-sm font-medium text-neutral-900"
                        >
                            Question Title
                        </label>
                        <div className="flex flex-row gap-1">
                            <input
                                id="titleInput"
                                type="text"
                                className={`w-2/3 rounded-lg border border-neutral-disabled bg-white`}
                                {...register('title', {})}
                            />
                            {hasTeam && (
                                <Controller
                                    control={control}
                                    name="is_public"
                                    render={({ field: { value } }) => (
                                        <PublicToggle value={value} setValue={setValue} />
                                    )}
                                />
                            )}
                        </div>
                    </div>
                    <div className="Description w-full gap-2 self-center">
                        <div className="flex justify-between">
                            <label
                                htmlFor="descriptionInput"
                                className="text-sm font-medium text-neutral-900"
                            >
                                Description
                            </label>

                            <PreviewToggle isPreview={isPreview} setIsPreview={setIsPreview} />
                        </div>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value, ref } }) => (
                                <div className="">
                                    {isPreview ? (
                                        <EditorPreview value={value} />
                                    ) : (
                                        <RichTextEditor
                                            onChange={onChange}
                                            value={value}
                                            usage="description"
                                            id="descriptionInput"
                                        />
                                    )}
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex w-full flex-row gap-1">
                        <div className="Tags w-1/2 space-y-1 self-center">
                            <label
                                htmlFor="tagsInput"
                                className="text-sm font-medium text-neutral-900"
                            >
                                Tags (max. 5)
                            </label>
                            <Controller
                                control={control}
                                name="tags"
                                render={({ field: { value } }) => (
                                    <TagsInput
                                        setValue={setValue}
                                        value={value}
                                        suggestions={tagSuggest}
                                        refetchSuggestions={refetchTags}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {tempTeams.length > 0 && (
                        <div className="flex w-full flex-col">
                            <div className="flex flex-row ">
                                <div className="gap-1">
                                    <label className="text-sm font-medium">Team (Optional)</label>
                                    <Controller
                                        control={control}
                                        name="team_id"
                                        render={({ field: { value } }) => {
                                            const teams = transformTeams()

                                            return (
                                                <SortDropdown
                                                    filters={teams}
                                                    selectedFilter={String(selectedFilter)}
                                                />
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
                <div className="Submit w-full self-center py-4">
                    <div className="float-left">
                        <Button
                            usage="question-form"
                            type="submit"
                            onClick={undefined}
                            isDisabled={isSubmitting || isSubmitSuccessful}
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
