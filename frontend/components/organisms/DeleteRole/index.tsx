import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'

const DeleteRole = (): JSX.Element => {
    return (
        <div>
            <Button usage="toggle-modal">
                <Icons name="table_delete" />
            </Button>
        </div>
    )
}

export default DeleteRole