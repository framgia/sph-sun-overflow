import PermissionPill from '@/components/molecules/PermissionPill'

type Props = {
    permissions: Array<{ id: number; name: string }>
}

const PermissionPills = ({ permissions }: Props): JSX.Element => {
    return (
        <div className="flex flex-wrap justify-center gap-1">
            {permissions.map((permission) => {
                return <PermissionPill key={permission.id}>{permission.name}</PermissionPill>
            })}
        </div>
    )
}

export default PermissionPills
