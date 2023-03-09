import { OptionType } from '@/components/molecules/Dropdown'
import EditMember from '../EditMember'
import RemoveMember from '../RemoveMember'

type Props = {
    id: number
    name: string
    role: string
    roles: OptionType[]
}

const ManageMembersActions = ({ id, name, role, roles }: Props): JSX.Element => {
    return (
        <div className="flex flex-row gap-4">
            <EditMember id={id} roles={roles} />
            <RemoveMember id={id} name={name} role={role} />
        </div>
    )
}

export default ManageMembersActions
