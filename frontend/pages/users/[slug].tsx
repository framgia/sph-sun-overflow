import ProfileLayout from '@/components/templates/Profile'
import TOGGLE_FOLLOW from '@/helpers/graphql/mutations/toggle_follow'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

const Profile = (): JSX.Element => {
    const userSlug = useBoundStore((state) => state.slug)
    const router = useRouter()
    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            slug: router.query.slug ?? '',
        },
    })
    const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
        refetchQueries: [{ query: GET_USER, variables: { slug: router.query.slug } }],
        onCompleted: (data) => successNotify(data.toggleFollow),
    })

    if (loading) return loadingScreenShow()
    if (error) {
        errorNotify(`Error! ${error.message}`)
        void router.push('/404')
        return loadingScreenShow()
    }
    if (data.user === null) {
        void router.push('/404')
        return loadingScreenShow()
    }

    const isPublic = userSlug !== router.query.slug

    return <ProfileLayout data={data.user} toggleFollow={toggleFollow} isPublic={isPublic} />
}
export default Profile
