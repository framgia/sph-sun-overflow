import { QuestionType } from '../[slug]'
import QuestionList from '@/components/organisms/QuestionList'
import DropdownFilters from '@/components/molecules/DropdownFilters'
import { useQuery } from '@apollo/client'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { errorNotify } from '../../../helpers/toast'
import { loadingScreenShow } from '../../../helpers/loaderSpinnerHelper'
import { useRouter } from 'next/router'
import { RefetchType } from '../index'
import { useEffect, useState } from 'react'
import Paginate from '@/components/organisms/Paginate'
import { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import QuestionsPageLayout from '@/components/templates/QuestionsPageLayout'
const TagsPage = () => {
    const router = useRouter()
    const [selectedTag, setSelectedTag] = useState('')
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_QUESTIONS, {
        variables: {
            first: 10,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            filter: { answered: true, tag: selectedTag },
        },
    })

    useEffect(() => {
        const { slug } = router.query

        refetch({
            first: 10,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
            filter: { answered: true, tag: selectedTag },
        })
        setSelectedTag(slug as string)
    }, [router, selectedTag, refetch])

    if (loading) return loadingScreenShow()
    if (error) return errorNotify(`Error! ${error}`)

    const { data: questions, paginatorInfo } = data.questions
    const questionList: QuestionType[] = questions
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = (first: number, page: number) => {
        refetch({ first, page, filter: { tag: selectedTag } })
    }

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
