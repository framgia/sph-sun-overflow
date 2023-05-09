import PageTitle from '@/components/atoms/PageTitle'
import QuestionsPageLayout from '@/components/templates/QuestionsPageLayout'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import GET_TAG from '@/helpers/graphql/queries/get_tag'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { loadingScreenShow } from '../../../helpers/loaderSpinnerHelper'
import { errorNotify } from '../../../helpers/toast'
import { answerFilterOption, orderByOptions, type RefetchType } from '../index'

const TagQuestionsPage = (): JSX.Element => {
    const router = useRouter()
    const selectedTag = String(router.query.slug ?? '')
    const order = orderByOptions[String(router.query.order ?? 'Newest first')]
    const answerFilter = answerFilterOption[String(router.query.filter ?? '')]
    const tagQuery = useQuery(GET_TAG, {
        variables: { slug: selectedTag },
    })
    const questionsQuery = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            filter: { tag: selectedTag },
        },
    })

    useEffect(() => {
        void questionsQuery.refetch({
            first: 10,
            page: 1,
            orderBy: [order],
            filter: { tag: selectedTag, ...answerFilter },
        })
    }, [router, selectedTag, questionsQuery.refetch])

    const loading = questionsQuery.loading || tagQuery.loading
    const error = questionsQuery.error ?? tagQuery.error

    if (loading) return loadingScreenShow()
    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    return (
        <>
            <PageTitle title="Tag Questions" />
            <QuestionsPageLayout
                refetch={questionsQuery.refetch}
                data={questionsQuery.data}
                isSearchResult={false}
                isPrivate={false}
                page_slug={'questions'}
                selectedTag={tagQuery.data.tag.name}
            />
        </>
    )
}

export default TagQuestionsPage
