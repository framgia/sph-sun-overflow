import type { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { setUserToken } from '@/helpers/localStorageHelper'
import SOCIAL_LOGIN from '@/helpers/graphql/mutations/social_login'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'

const LoginCheck: NextPage = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [socialLogin, { data, loading, error }] = useMutation(SOCIAL_LOGIN)

    if (status === 'loading') return loadingScreenShow()
    else if (status === 'authenticated') {
        socialLogin({
            variables: {
                token: session.accessToken,
                email: session.user?.email,
            },
        })

        if (loading) return loadingScreenShow()
        else if (error) {
            if (error?.message === 'Authentication exception')
                errorNotify('You are not authorized to login')

            signOut()
            router.push('/login')
        } else if (data) {
            setUserToken(data.socialLogin.access_token)
            window.location.href = '/questions';
        }
    } else {
        router.push('/login')
    }
}

export default LoginCheck
