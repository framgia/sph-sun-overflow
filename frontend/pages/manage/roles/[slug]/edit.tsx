import type { RoleType } from '@/components/organisms/RoleForm'
import RoleForm from '@/components/organisms/RoleForm'

const RoleCreate = (): JSX.Element => {
    const role: RoleType = {
        name: '',
        id: 1,
        description: '',
        permissions: [],
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
    }

    return (
        <div className="w-full pt-16 pl-10">
            <RoleForm role={role} onSubmit={onSubmit}></RoleForm>
        </div>
    )
}

export default RoleCreate
