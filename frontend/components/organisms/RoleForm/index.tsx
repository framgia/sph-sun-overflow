import Button from '@/components/atoms/Button'
import { Checkbox, Input } from '@material-tailwind/react'
import { useRouter } from 'next/router'

export type PermissionType = Array<{
    isSelected: boolean
    id: number
    name: string
}>

export type RoleType = {
    id: number | null
    name: string
    description: string
    permissions: PermissionType[]
}

type Props = {
    role: RoleType
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const RoleForm = ({ role, onSubmit }: Props): JSX.Element => {
    const permissions: PermissionType = [
        {
            isSelected: false,
            id: 1,
            name: 'Add role',
        },
        {
            isSelected: false,
            id: 2,
            name: 'Remove role',
        },
        {
            isSelected: false,
            id: 3,
            name: 'Edit role',
        },
        {
            isSelected: false,
            id: 4,
            name: 'View role',
        },

        {
            isSelected: false,
            id: 1,
            name: 'Add role',
        },
        {
            isSelected: false,
            id: 2,
            name: 'Remove role',
        },
        {
            isSelected: false,
            id: 3,
            name: 'Edit role',
        },
        {
            isSelected: false,
            id: 4,
            name: 'View role',
        },
        {
            isSelected: false,
            id: 1,
            name: 'Add role',
        },
        {
            isSelected: false,
            id: 2,
            name: 'Remove role',
        },
        {
            isSelected: false,
            id: 3,
            name: 'Edit role',
        },
        {
            isSelected: false,
            id: 4,
            name: 'View role',
        },
        {
            isSelected: false,
            id: 1,
            name: 'Add role',
        },
        {
            isSelected: false,
            id: 2,
            name: 'Remove role',
        },
        {
            isSelected: false,
            id: 3,
            name: 'Edit role',
        },
        {
            isSelected: false,
            id: 4,
            name: 'View role',
        },
        {
            isSelected: false,
            id: 1,
            name: 'Add role',
        },
        {
            isSelected: false,
            id: 2,
            name: 'Remove role',
        },
        {
            isSelected: false,
            id: 3,
            name: 'Edit role',
        },
        {
            isSelected: false,
            id: 4,
            name: 'View role',
        },
    ]

    const router = useRouter()

    const renderPermissionSelection = (): JSX.Element[] => {
        return permissions.map(
            (permission, index): JSX.Element => <Checkbox key={index} label={permission.name} />
        )
    }
    return (
        <div className="flex w-4/5 flex-col gap-2 py-6">
            <div className="flex shrink">
                <div className="text-primary-gray">
                    <Button
                        usage="back-button"
                        onClick={() => {
                            void router.push('/manage/roles')
                        }}
                    >
                        <span className="text-base">{'<'} Go Back</span>
                    </Button>
                </div>
            </div>
            <div className="mb-2 pt-2 text-2xl font-bold">{role.id ? 'Manage' : 'Add'} Role</div>
            <form onSubmit={onSubmit}>
                <div className="mb-4 flex w-full pr-36">
                    <div className="w-96 pr-5">
                        <Input size="lg" color="gray" className="shadow-md" label="Name" />
                    </div>
                    <div className="w-96 ">
                        <Input size="lg" color="gray" className="shadow-md" label="Description" />
                    </div>
                </div>
                <div className="mt-12">
                    <div className="mb-2 text-2xl font-bold">Set Permissions</div>
                    <div className="mb-4 grid w-full grid-cols-6">
                        {renderPermissionSelection()}
                    </div>
                </div>
                <Button usage="primary" additionalClass="float-right mt-5 mr-16" type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}

export default RoleForm
