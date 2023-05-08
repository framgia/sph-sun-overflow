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
        width: 240,
    },
    {
        title: 'Description',
        key: 'description',
        width: 500,
    },
    {
        title: 'Questions',
        key: 'count_tagged_questions',
        width: 96,
    },
    {
        title: 'Actions',
        key: 'action',
        width: 96,
    },
]

const Tags: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const { data, loading, error, refetch } = useQuery<any, RefetchType>(GET_TAGS, {
        variables: {
            first: 6,
            page: 1,
            sort: [{ column: 'UPDATED_AT', order: 'DESC' }],
        },
    })

    useEffect(() => {
        void refetch({
            first: 6,
            page: 1,
            name: '%%',
            sort: [{ column: 'UPDATED_AT', order: 'DESC' }],
        })
    }, [router, refetch])

    if (loading) return loadingScreenShow()
    if (error) return <span>{errorNotify(`Error! ${error.message}`)}</span>

    const { data: tags, paginatorInfo } = data?.tags ?? {
        data: [],
        paginatorInfo: { currentPage: 1, hasMorePages: false, lastPage: 1 },
    }
    const pageInfo: PaginatorInfo = paginatorInfo

    const onPageChange = async (first: number, page: number): Promise<void> => {
        await refetch({ first, page })
    }

    const closeModal = (): void => {
        setIsOpen(false)
    }

    const refetchHandler = (isDelete = false): void => {
        void refetch({
            first: 6,
            name: '%%',
            sort: [{ column: 'UPDATED_AT', order: 'DESC' }],
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

    const renderFooter = (): JSX.Element | null => {
        if (pageInfo.lastPage > 1) {
            return (
                <div className="flex w-full items-center justify-center">
                    <Paginate {...pageInfo} onPageChange={onPageChange} />
                </div>
            )
        }
        return null
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex h-full flex-col gap-4">
                <div className="flex items-center justify-end">
                    <Button
                        usage="stroke"
                        size="large"
                        onClick={() => {
                            setIsOpen(true)
                        }}
                    >
                        Add Tag
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={getTagsDataTable(tags)}
                    actions={getTagsActions}
                    footer={renderFooter()}
                />
                <TagsFormModal isOpen={isOpen} closeModal={closeModal} refetchHandler={refetch} />
            </div>
        </div>
    )
}

export default Tags
