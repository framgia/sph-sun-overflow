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
    filter?: { keyword?: string; answered?: boolean; tag?: string; team?: string }
    orderBy?: Array<{ column: string; order: string }>
    sort?: Array<{ column: string; order: string }>
}

const QuestionsPage = (): JSX.Element => {
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
            .then(() => {})
            .catch(() => {})
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
