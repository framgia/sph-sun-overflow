import { OptionType } from '@/components/molecules/Dropdown'
import EditMember from '../EditMember'
import RemoveMember from '../RemoveMember'

type Props = {
    id: number
    user_id: number
    team_id: number
    name: string
    role: string
    roles: OptionType[]
    refetchHandler: () => void
}

const ManageMembersActions = ({
    id,
    user_id,
    team_id,
    name,
    role,
    roles,
    refetchHandler,
}: Props): JSX.Element => {
    return (
        <div className="flex flex-row gap-4">
            <EditMember
                id={id}
                user_id={user_id}
                team_id={team_id}
                roles={roles}
                role={role}
                refetchHandler={refetchHandler}
            />
            <RemoveMember id={id} name={name} role={role} refetchHandler={refetchHandler} />
        </div>
    )
}

export default ManageMembersActions
