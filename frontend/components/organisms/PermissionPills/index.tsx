import PermissionPill from '@/components/molecules/PermissionPill'

type Props = {
    permissions: Array<{ id: number; name: string }>
}

const PermissionPills = ({ permissions }: Props): JSX.Element => {
    return (
        <div className="grid grid-cols-1 justify-items-center gap-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {permissions.map((permission) => {
                return <PermissionPill key={permission.id}>{permission.name}</PermissionPill>
            })}
        </div>
    )
}

export default PermissionPills
