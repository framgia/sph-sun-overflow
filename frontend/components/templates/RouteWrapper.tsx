import GET_AUTHENTICATED_USER from '@/helpers/graphql/queries/get_authenticated_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { getUserToken } from '@/helpers/localStorageHelper'
import { useBoundStore } from '@/helpers/store'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import AdminWrapper from './AdminWrapper'

type LayoutProps = {
    children: JSX.Element
}

const RouteWrapper = ({ children }: LayoutProps): JSX.Element => {
    const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER)

    const setUserID = useBoundStore((state) => state.setUserID)

    const router = useRouter()

    const dataCheckIfNone = data?.me === null || data === undefined
    const errorCheck = error?.message === 'Unauthenticated.' || error === undefined
    const routeIfLoginPathCheck = router.asPath.includes('login')

    if (!dataCheckIfNone)
        setUserID(
            data?.me.id,
            data?.me.first_name,
            data?.me.last_name,
            data?.me.email,
            data?.me.avatar,
            data?.me.slug,
            data?.me.google_id,
            data?.me.teams,
            data?.me.watchedTags,
            data?.me.updated_at,
            data?.me.role.name,
            data?.me.role.permissions
        )

    if (loading) return <div className="pt-14">{loadingScreenShow()}</div>
    else if (dataCheckIfNone && errorCheck && !routeIfLoginPathCheck && getUserToken() === '') {
        void router.push('/login')
    } else if (!dataCheckIfNone && routeIfLoginPathCheck && getUserToken() !== '') {
        void router.push('/')
    } else {
        return <AdminWrapper>{children}</AdminWrapper>
    }
    return <></>
}

export default RouteWrapper
