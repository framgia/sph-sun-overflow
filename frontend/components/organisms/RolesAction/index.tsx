import DeleteRole from '../DeleteRole'
import EditRole from '../EditRole'

type Props = {
    id: number
    refetchHandler: () => void
}

const RolesActions = ({ id, refetchHandler }: Props): JSX.Element => {
    return (
        <div className="flex flex-row gap-4">
            <EditRole />
            <DeleteRole id={id} refetchHandler={refetchHandler} />
        </div>
    )
}

export default RolesActions
