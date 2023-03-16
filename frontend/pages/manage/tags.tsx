import Button from '@/components/atoms/Button'
import Table, { ColumnType } from '@/components/organisms/Table'
import { NextPage } from 'next'
import { HiPencil } from 'react-icons/hi'

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
        title: 'Action',
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
]

const Tags: NextPage = () => {
    const renderTableActions = (key: number): JSX.Element => {
        return (
            <div className="flex items-center ">
                <Button usage="icon" onClick={() => {}}>
                    <HiPencil className="cursor-pointer text-2xl" />
                </Button>
            </div>
        )
    }

    return (
        <div className="flex w-full flex-col gap-4 divide-y-2 p-8">
            <h1 className="text-3xl font-bold"></h1>
            <div className="flex h-full flex-col gap-4">
                <div className="overflow-hidden border border-black">
                    <Table columns={columns} dataSource={tempValues} actions={renderTableActions} />
                </div>
                {/* <div className="mt-auto">
                    {paginatorInfo.lastPage > 1 && (
                        <Paginate {...paginatorInfo} onPageChange={onPageChange} />
                    )}
                </div> */}
            </div>
        </div>
    )
}

export default Tags
