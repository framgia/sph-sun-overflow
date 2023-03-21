import Button from '@/components/atoms/Button'
import Icons from '@/components/atoms/Icons'
import { useRouter } from 'next/router'

type Props = {
    slug: string
}

const EditRole = ({ slug }: Props): JSX.Element => {
    const router = useRouter()
    return (
        <div>
            <Button
                usage="toggle-modal"
                onClick={() => {
                    void router.push(`roles/${slug}/edit`)
                }}
            >
                <Icons name="table_edit" additionalClass="fill-gray-500" />
            </Button>
        </div>
    )
}

export default EditRole
