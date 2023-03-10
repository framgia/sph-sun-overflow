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

    const [socialLogin, { loading }] = useMutation(SOCIAL_LOGIN)

    if (status === 'loading') return loadingScreenShow()
    else if (status === 'authenticated') {
        socialLogin({
            variables: {
                token: session.accessToken,
                email: session.user?.email,
            },
        })
            .then(({ data }) => {
                setUserToken(data.socialLogin.access_token)
                window.location.href = '/questions'
            })
            .catch((error) => {
                signOut({
                    callbackUrl: `/login?${
                        error?.message === 'Authentication exception' ? 'unauthorized=true' : ''
                    }`,
                })
            })

        if (loading) return loadingScreenShow()
    } else {
        router.push('/login')
    }
}

export default LoginCheck
