import Button from '@/components/atoms/Button'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import TagsActions from '@/components/organisms/TagsAction'
import TagsFormModal from '@/components/organisms/TagsFormModal'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TAGS from '@/helpers/graphql/queries/get_tags'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import type { RefetchType } from '@/pages/questions'
import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const columns: ColumnType[] = [
    {
        title: 'Tag',
        key: 'name',
    },
    {
        title: 'Description',
        key: 'description',
    },
    {
        title: 'Questions',
        key: 'count_tagged_questions',
    },
    {
        title: '',
        key: 'action',
        width: 20,
    },
]

const Tags: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_TAGS, {
        variables: {
            first: 6,
            page: 1,
            sort: [{ column: 'POPULARITY', order: 'DESC' }],
        },
    })

    useEffect(() => {
        void refetch({
            first: 6,
            page: 1,
            name: '%%',
            sort: [{ column: 'POPULARITY', order: 'DESC' }],
        })
    }, [router, refetch])

    if (loading) return loadingScreenShow()
    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    const { data: tags, paginatorInfo } = data.tags
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    const renderPagination = (): JSX.Element => {
        return pageInfo.lastPage > 1 ? (
            <Paginate {...pageInfo} perPage={6} onPageChange={onPageChange} />
        ) : (
            <></>
        )
    }

    const closeModal = (): void => {
        setIsOpen(false)
    }

    const refetchHandler = (isDelete = false): void => {
        void refetch({
            first: 6,
            name: '%%',
            sort: [{ column: 'POPULARITY', order: 'DESC' }],
            page:
                isDelete && paginatorInfo.count === 1 && paginatorInfo.currentPage > 1
                    ? paginatorInfo.currentPage - 1
                    : paginatorInfo.currentPage,
        })
    }

    const getTagsDataTable = (tagList: DataType[], truncate: boolean = true): DataType[] => {
        return tagList.map((tag): DataType => {
            return {
                key: tag.id,
                name: truncate ? tag.truncated_name : tag.name,
                description: truncate ? tag.truncated_description : tag.description,
                count_tagged_questions: tag.count_tagged_questions,
                slug: tag.slug,
            }
        })
    }

    const getTagsActions = (key: number): JSX.Element | undefined => {
        const dataSource = getTagsDataTable(tags, false).find((tag) => +tag.key === key)

        if (dataSource) {
            return (
                <TagsActions
                    id={dataSource.key as number}
                    name={dataSource.name as string}
                    description={dataSource.description as string}
                    refetchHandler={refetchHandler}
                />
            )
        }
    }

    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tags</h1>
                    <Button
                        type="button"
                        onClick={() => {
                            setIsOpen(true)
                        }}
                    >
                        New Tag
                    </Button>
                </div>
                <div className="overflow-hidden border border-black">
                    <Table
                        columns={columns}
                        dataSource={getTagsDataTable(tags)}
                        actions={getTagsActions}
                    />
                </div>
                <TagsFormModal isOpen={isOpen} closeModal={closeModal} refetchHandler={refetch} />
                <div className="mt-auto">{renderPagination()}</div>
            </div>
        </div>
    )
}

export default Tags
