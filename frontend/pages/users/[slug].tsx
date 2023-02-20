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
import { RightSideBar } from '@/components/organisms/Sidebar'

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
    const user_id = useBoundStore.getState().user_id

    const router = useRouter()
    const query = router.query
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: {
            slug: query.slug,
        },
    })

    useEffect(() => {
        refetch()
    }, [router, refetch])

    useEffect(() => {
        console.log(data)
    }, [data])

    if (loading) return loadingScreenShow()
    else if (error) return errorNotify(`Error! ${error}`)

    const profile: ProfileType = {
        ...data.user,
    }

    return (
        <div className="mx-8 mt-10 flex h-full w-full flex-col">
            <div className="flex h-auto w-full flex-row ">
                <div className="ml-6 flex w-1/6 flex-col ">
                    <ProfileImage
                        first_name={profile.first_name}
                        last_name={profile.last_name}
                        avatar={profile.avatar}
                    />
                </div>
                <div className="mx-10 flex w-1/2 flex-col">
                    <AboutMe
                        about_me={profile.about_me}
                        authenticated_user_id={user_id}
                        user_id={profile.id}
                    />
                </div>
                <div className="mr-10 flex grow">
                    {user_id == Number(data.user.id) && <RightSideBar usage="users" />}
                </div>
            </div>
            <div className="my-4 flex w-full flex-row ">
                <div className=" mr-20 ml-6 flex w-1/6 justify-center">
                    <Button type="button" usage="follow" additionalClass="my-auto drop-shadow-xl">
                        Follow
                    </Button>
                </div>
                <div className=" flex w-1/2 px-8 ">
                    <div className="flex w-full flex-row self-end">
                        <ProfileStats value={profile.reputation} text="Reputation" />
                        <ProfileStats value={profile.question_count} text="Questions" />
                        <ProfileStats value={profile.answer_count} text="Answers" />
                        <ProfileStats value={2} text="Followers" />
                        <ProfileStats value={4} text="Following" />
                    </div>
                </div>
            </div>
            <div className="mt-3 flex h-3/5 flex-col">
                <ul className="h-1/10 ml-10 flex w-[95%] flex-row border-b-2 border-gray-300">
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
