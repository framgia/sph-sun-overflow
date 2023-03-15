import PermissionPill from '@/components/molecules/PermissionPill'

type Props = {
    permissions: { id: number; name: string }[]
}

const PermissionPills = ({ permissions }: Props): JSX.Element => {
    return (
        <div className="flex w-auto flex-row gap-1">
            {permissions.map((permission) => {
                return <PermissionPill key={permission.id}>{permission.name}</PermissionPill>
            })}
        </div>
    )
}

export default PermissionPills
