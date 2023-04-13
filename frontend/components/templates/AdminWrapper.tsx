import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { capitalize } from '@/utils'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { useBoundStore } from '@/helpers/store'
import { groupBy, has, mapValues } from 'lodash'
type TProps = {
    children: JSX.Element
}

const AdminWrapper = ({ children }: TProps): JSX.Element => {
    const router = useRouter()
    const permissions = useBoundStore((state) => state.permissions)
    const groupedPermissions = mapValues(groupBy(permissions, 'category'), (permissions) =>
        permissions.map((permission) => permission.name)
    )
    const checkPermission = (permission: string | undefined): boolean =>
        permission ? has(groupedPermissions, permission) : false

    const permission = capitalize(router.pathname.split('/')[2]?.slice(0, -1))

    if (router.pathname.startsWith('/manage') && !checkPermission(permission)) {
        void router.push('/403')
        return loadingScreenShow()
    }
    return <Fragment>{children}</Fragment>
}
export default AdminWrapper
