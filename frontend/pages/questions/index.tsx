import QuestionsPageLayout from '@/components/templates/QuestionPageLayout'
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
    filter?: { keyword?: string; answered?: boolean; tag?: string }
    orderBy?: { column: string; order: string }[]
    sort?: { column: string; order: string }[]
}

const QuestionsPage = () => {
    const router = useRouter()
    const [searchKey, setSearchKey] = useState('')

    const isSearchResult = router.asPath.includes('/questions?search=')
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            filter: { keyword: searchKey, answered: true, tag: '' },
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        },
    })

    useEffect(() => {
        setSearchKey(router.query.search as string)
        refetch({
            page: 1,
            filter: { keyword: router.query.search as string, answered: true, tag: '' },
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        })
    }, [router, searchKey, refetch])

    if (loading) return loadingScreenShow()
    if (error) return errorNotify(`Error! ${error}`)

    return (
        <QuestionsPageLayout
            refetch={refetch}
            data={data}
            searchKey={searchKey}
            isSearchResult={isSearchResult}
            isPrivate={false}
        />
    )
}

export default QuestionsPage
