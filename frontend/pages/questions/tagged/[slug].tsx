import QuestionsPageLayout from '@/components/templates/QuestionsPageLayout'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { loadingScreenShow } from '../../../helpers/loaderSpinnerHelper'
import { errorNotify } from '../../../helpers/toast'
import { answerFilterOption, orderByOptions, type RefetchType } from '../index'

const TagsPage = (): JSX.Element => {
    const router = useRouter()
    const [selectedTag, setSelectedTag] = useState(router.query.slug as string)
    const order = orderByOptions[String(router.query.order ?? 'Newest first')]
    const answerFilter = answerFilterOption[String(router.query.filter ?? '')]
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            filter: { tag: selectedTag },
        },
    })

    useEffect(() => {
        const { slug } = router.query

        void refetch({
            first: 10,
            page: 1,
            orderBy: [order],
            filter: { tag: selectedTag, ...answerFilter },
        })
        setSelectedTag(slug as string)
    }, [router, selectedTag, refetch])

    if (loading) return loadingScreenShow()
    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    return (
        <QuestionsPageLayout
            refetch={refetch}
            data={data}
            isSearchResult={false}
            isPrivate={false}
            page_slug={'questions'}
            selectedTag={selectedTag}
        />
    )
}

export default TagsPage
