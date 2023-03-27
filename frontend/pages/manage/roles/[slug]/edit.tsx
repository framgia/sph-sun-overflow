import RoleForm from '@/components/organisms/RoleForm'
import GET_ROLE from '@/helpers/graphql/queries/get_role'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const RoleEdit = (): JSX.Element => {
    const router = useRouter()
    const {
        data: { role } = {},
        loading,
        error,
    } = useQuery(GET_ROLE, {
        variables: {
            slug: router.query.slug,
        },
        fetchPolicy: 'network-only',
    })

    if (loading) return loadingScreenShow()
    if (error) {
        void router.push('/manage/roles')
        return <span>{errorNotify(`Error! ${error.message}`)}</span>
    }

    return (
        <div className="w-full pt-16 pl-10">
            <RoleForm role={role}></RoleForm>
        </div>
    )
}

export default RoleEdit
