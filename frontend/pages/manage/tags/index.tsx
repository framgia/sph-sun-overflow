import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import Paginate from '@/components/organisms/Paginate'
import type { ColumnType } from '@/components/organisms/Table'
import Table from '@/components/organisms/Table'
import type { NextPage } from 'next'

const columns: ColumnType[] = [
    {
        title: 'Tag',
        key: 'tag',
    },
    {
        title: 'Description',
        key: 'decription',
    },
    {
        title: 'Questions',
        key: 'questions',
    },
    {
        title: '',
        key: 'action',
        width: 20,
    },
]

const tempValues = [
    {
        id: 1,
        tag: 'test',
        decription: 'test',
        questions: 1,
    },
    {
        id: 2,
        tag: 'test',
        decription: 'test',
        questions: 2,
    },
    {
        id: 2,
        tag: 'test',
        decription: 'test',
        questions: 2,
    },
    {
        id: 2,
        tag: 'test',
        decription: 'test',
        questions: 2,
    },
]

const tempPaginateProps = {
    currentPage: 1,
    lastPage: 2,
    hasMorePages: true,
    onPageChange: () => {
        console.log('next')
    },
}

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
    return (
        <div className="flex w-full flex-col gap-4 p-8">
            <div className="flex h-full flex-col gap-4">
                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tags</h1>
                    <Button type="button">New Tag</Button>
                </div>
                <div className="overflow-hidden border border-black">
                    <Table columns={columns} dataSource={tempValues} actions={renderTagsActions} />
                </div>
                <Paginate {...tempPaginateProps} />
            </div>
        </div>
    )
}

export default Tags
