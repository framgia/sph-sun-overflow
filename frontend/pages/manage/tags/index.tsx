import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType, DataType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import type { PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import GET_TAGS from '@/helpers/graphql/queries/get_tags'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import type { RefetchType } from '@/pages/questions'
import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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

const editAction = (): JSX.Element => {
    return (
        <div>
            <Icons name="table_edit" additionalClass="fill-gray-500" />
        </div>
    )
}

const deleteAction = (): JSX.Element => {
    return (
        <div>
            <Icons name="table_delete" additionalClass="fill-gray-500" />
        </div>
    )
}

const renderTagsActions = (): JSX.Element => {
    return (
        <div className="flex flex-row gap-4">
            {editAction()}
            {deleteAction()}
        </div>
    )
}

const Tags: NextPage = () => {
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
    const tagList: DataType[] = tags
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

    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tags</h1>
                    <Button type="button">New Tag</Button>
                </div>
                <div className="overflow-hidden border border-black">
                    <Table columns={columns} dataSource={tagList} actions={renderTagsActions} />
                </div>
                <div className="mt-auto">{renderPagination()}</div>
            </div>
        </div>
    )
}

export default Tags
