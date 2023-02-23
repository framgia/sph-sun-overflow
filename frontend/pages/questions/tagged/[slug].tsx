import { QuestionType } from '../[slug]'
import QuestionList from '@/components/organisms/QuestionList'
import DropdownFilters from '@/components/molecules/DropdownFilters'
import { useQuery } from '@apollo/client'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { errorNotify } from '../../../helpers/toast'
import { loadingScreenShow } from '../../../helpers/loaderSpinnerHelper'
import { useRouter } from 'next/router'
import { RefetchType, PaginatorInfo } from '../index'
import { useEffect, useState } from 'react'
import Paginate from '@/components/organisms/Paginate'

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
        <div className="w-full px-8 py-8">
            <h1 className="mb-6 text-2xl font-bold">
                Questions tagged with <span className="text-primary-red">{selectedTag}</span>
            </h1>
            <hr className="mb-4 h-[1px] border-none bg-secondary-black" />
            <div className="mb-2 flex justify-end gap-2">
                <DropdownFilters
                    triggers={['DATE', 'ANSWER']}
                    tag={selectedTag}
                    refetch={refetch}
                />
            </div>
            <div className="flex flex-col divide-y-2">
                {questionList.map((question) => (
                    <QuestionList
                        key={question.id}
                        id={question.id}
                        title={question.title}
                        slug={question.slug}
                        content={question.content}
                        created_at={question.created_at}
                        humanized_created_at={question.humanized_created_at}
                        vote_count={question.vote_count}
                        answer_count={question.answers.length}
                        view_count={question.views_count}
                        tags={question.tags}
                        user={question.user}
                    />
                ))}
            </div>
            {pageInfo.lastPage > 1 && <Paginate {...pageInfo} onPageChange={onPageChange} />}
        </div>
    )
}

export default TagsPage
