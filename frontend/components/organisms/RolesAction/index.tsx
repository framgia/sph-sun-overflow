import DeleteRole from '../DeleteRole'
import EditRole from '../EditRole'

const RolesActions = (): JSX.Element => {
    return (
        <div className="flex flex-row gap-4">
            <EditRole />
            <DeleteRole />
        </div>
    )
}

export default RolesActions
