import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'

const EditRole = () => {
    return (
        <div>
            <Button usage="toggle-modal">
                <Icons name="table_edit" additionalClass="fill-gray-500" />
            </Button>
        </div>
    )
}

export default EditRole
