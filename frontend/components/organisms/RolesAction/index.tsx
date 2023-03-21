import DeleteRole from '../DeleteRole'
import EditRole from '../EditRole'

type Props = {
    id: number
    slug: string
    refetchHandler: () => void
}

const RolesActions = ({ id, slug, refetchHandler }: Props): JSX.Element => {
    return (
        <div className="flex flex-row gap-4">
            <EditRole slug={slug} />
            <DeleteRole id={id} refetchHandler={refetchHandler} />
        </div>
    )
}

export default RolesActions
