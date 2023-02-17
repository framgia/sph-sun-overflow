import Button from '@/components/atoms/Button'
import ProfileImage from '@/components/atoms/ProfileImage'
import ProfileStats from '@/components/atoms/ProfileStats'
import AboutMe from '@/components/molecules/AboutMe'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export type ProfileType = {
    id: number
    first_name: string
    last_name: string
    avatar: string
    reputation: number
    question_count: number
    answer_count: number
    about_me: string
}

const ProfilePage = () => {
    useEffect(() => {
        refetch()
    })

    const user_id = useBoundStore.getState().user_id

    const router = useRouter()
    const query = router.query

    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: {
            ID: query.id,
        },
    })

    if (loading) return loadingScreenShow()
    else if (error) return errorNotify(`Error! ${error}`)

    const profile: ProfileType = {
        ...data.user,
    }

    return (
        <div className="flex h-full flex-col">
            <div className="mt-10 flex h-auto w-full flex-row ">
                <div className="ml-6 flex w-1/3 flex-col ">
                    <ProfileImage
                        first_name={profile.first_name}
                        last_name={profile.last_name}
                        avatar={profile.avatar}
                    />
                </div>
                <div className="flex w-3/4 flex-col">
                    <AboutMe
                        about_me={profile.about_me}
                        authenticated_user_id={user_id}
                        user_id={profile.id}
                    />
                </div>
            </div>
            <div className="my-4 flex w-full flex-row ">
                <div className="ml-10 flex w-1/3 justify-center ">
                    <Button type="button" usage="follow" additionalClass="my-auto drop-shadow-xl">
                        Follow
                    </Button>
                </div>
                <div className="ml-12 flex w-2/3 ">
                    <div className="flex w-full flex-row self-end">
                        <ProfileStats value={profile.reputation} text="Reputation" />
                        <ProfileStats value={profile.question_count} text="Questions" />
                        <ProfileStats value={profile.answer_count} text="Answers" />
                        <ProfileStats value={2} text="Followers" />
                        <ProfileStats value={4} text="Following" />
                    </div>
                </div>
            </div>
            <div className="mt-3 ml-6 flex h-3/5 flex-col">
                <ul className="h-1/10 ml-10 flex w-[129%] flex-row border-b-2 border-gray-300">
                    <li className="">
                        <div className="-mb-[1px] border-b-2 border-b-primary-red bg-red-100 px-6 font-semibold">
                            Activity
                        </div>
                    </li>
                    <div className="-mb-[1px] border-b-2 border-b-gray-300 px-6">Bookmarks</div>
                </ul>
            </div>
        </div>
    )
}
export default ProfilePage
