import { useMutation } from '@apollo/client'
import { setUserToken } from '@/helpers/localStorageHelper'
import SOCIAL_LOGIN from '@/helpers/graphql/mutations/social_login'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { ISession } from '../api/auth/[...nextauth]'

const LoginCheck = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [socialLogin, { loading }] = useMutation(SOCIAL_LOGIN)

    if (status === 'loading') return loadingScreenShow()
    else if (status === 'authenticated') {
        const newSession: ISession = session
        socialLogin({
            variables: {
                token: newSession.accessToken,
                email: newSession.user?.email,
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
