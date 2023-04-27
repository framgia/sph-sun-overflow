import QuestionsPageLayout from '@/components/templates/QuestionsPageLayout'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { loadingScreenShow } from '../../helpers/loaderSpinnerHelper'
import { errorNotify } from '../../helpers/toast'

export type RefetchType = {
    first: number
    page: number
    name?: string
    filter?: {
        keyword?: string
        answered?: boolean
        tag?: string
        team?: string
        user_slug?: string
    }
    isAdmin?: boolean
    orderBy?: Array<{ column: string; order: string }>
    sort?: Array<{ column: string; order: string }>
}

export type OrderOption = Record<string, { column: string; order: string }>
type FilterOption = Record<string, { answered: boolean }>

export const orderByOptions: OrderOption = {
    'Newest first': { column: 'CREATED_AT', order: 'DESC' },
    'Oldest first': { column: 'CREATED_AT', order: 'ASC' },
    'Most recent': { column: 'UPDATED_AT', order: 'DESC' },
    'Least recent': { column: 'UPDATED_AT', order: 'ASC' },
}

export const answerFilterOption: FilterOption = {
    Answered: { answered: true },
    Unanswered: { answered: false },
}

const QuestionsPage = (): JSX.Element => {
    const router = useRouter()
    const [searchKey, setSearchKey] = useState('')
    const isSearchResult = router.asPath.includes('/questions?search=')
    const order = orderByOptions[String(router.query.order ?? 'Newest first')]
    const answerFilter = answerFilterOption[String(router.query.filter ?? '')]

    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            filter: { keyword: searchKey, tag: '', ...answerFilter },
            orderBy: [order],
        },
    })

    useEffect(() => {
        setSearchKey(router.query.search as string)
    }, [router, searchKey, refetch])

    if (loading) return loadingScreenShow()
    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    return (
        <QuestionsPageLayout
            refetch={refetch}
            data={data}
            searchKey={searchKey}
            isSearchResult={isSearchResult}
            isPrivate={false}
            page_slug={'questions'}
        />
    )
}

export default QuestionsPage
