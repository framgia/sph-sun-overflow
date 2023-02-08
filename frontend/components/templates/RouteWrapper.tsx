import GET_AUTHENTICATED_USER from '@/helpers/graphql/queries/get_authenticated_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { getUserToken } from '@/helpers/localStorageHelper'
import { useBoundStore } from '@/helpers/store'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

type LayoutProps = {
    children: JSX.Element
}

const RouteWrapper = ({ children }: LayoutProps) => {
    const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER)

    const setUserID = useBoundStore((state) => state.setUserID)

    const router = useRouter()

    const dataCheckIfNone = data?.me === null || data === undefined
    const errorCheck = error?.message === 'Unauthenticated.' || error === undefined
    const routeIfLoginPathCheck = router.asPath === '/login' || router.asPath === '/login/check'

    if (!dataCheckIfNone)
        setUserID(
            data?.me.id,
            data?.me.first_name,
            data?.me.last_name,
            data?.me.email,
            data?.me.avatar
        )

    if (loading) return loadingScreenShow()
    else if (dataCheckIfNone && errorCheck && !routeIfLoginPathCheck && getUserToken() === '')
        router.push('/login')
    else if (!dataCheckIfNone && routeIfLoginPathCheck && getUserToken() !== '') router.push('/')
    else return children
}

export default RouteWrapper
