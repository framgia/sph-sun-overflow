import Button from '@/components/atoms/Button'
import ProfileStats from '@/components/atoms/ProfileStats'
import Activity from '@/components/molecules/Activity'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useBoundStore, UserTeamType } from '@/helpers/store'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RightSideBar } from '@/components/organisms/Sidebar'
import { AnswerType, QuestionType, TagType, UserType } from '../questions/[slug]'
import BookmarkTabContent from '@/components/organisms/BookmarkTabContent'
import GET_BOOKMARKS from '@/helpers/graphql/queries/get_bookmarks'
import TOGGLE_FOLLOW from '@/helpers/graphql/mutations/toggle_follow'
import ProfileInfo from '@/components/organisms/ProfileInfo'
import ProfileInfoEdit from '@/components/organisms/ProfileInfo/edit'

export type ProfileType = {
    id: number
    first_name: string
    last_name: string
    avatar: string
    reputation: number
    question_count: number
    answer_count: number
    about_me: string
    top_questions: QuestionType[]
    top_answers: AnswerType[]
    is_following: boolean
    follower_count: number
    following_count: number
    updated_at: string
    slug: string
    email: string
    teams: [UserTeamType]
}
export type BookmarkableType = {
    __typename: string
    id: number
    title?: string
    slug?: string
    content: string
    created_at: string
    humanized_created_at?: string
    vote_count: number
    answers?: { id: number; content: string }[]
    views_count?: number
    tags?: TagType[]
    user: UserType
    question?: BookmarkQuestionType
}
type BookmarkQuestionType = {
    id: number
    title: string
    slug: string
    content: string
    created_at: string
    humanized_created_at: string
    vote_count: number
    answers: { id: number; content: string }[]
    views_count: number
    tags: TagType[]
    user: UserType
}
export type BookmarkType = {
    id?: number
    bookmarkable?: BookmarkableType
    user?: UserType
}
const getActiveTabClass = (status: boolean): string => {
    if (status) {
        return '-mb-[1px] hover:text-primary-red px-6 font-semibold border-b-2 border-primary-red bg-red-100'
    }
    return '-mb-[1px] hover:text-primary-red px-6 active:border-red-400'
}
const ProfilePage = () => {
    const user_id = useBoundStore.getState().user_id
    const setUserID = useBoundStore((state) => state.setUserID)
    const [isActiveTab, setIsActiveTab] = useState('Activity')
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const query = router.query
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: {
            slug: query.slug,
        },
    })
    const profileIsNull = (): boolean => {
        if (data === undefined || data === null) {
            return true
        }
        return false
    }
    const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
        refetchQueries: [{ query: GET_USER, variables: { slug: query.slug } }],
        onCompleted: (data) => successNotify(data.toggleFollow),
    })
    const bookmarkQuery = useQuery(GET_BOOKMARKS, {
        variables: {
            user_id: Number(data?.user.id),
            first: 2,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        },
        skip: profileIsNull(),
    })
    useEffect(() => {
        refetch()
    }, [router, refetch])
    if (loading) return loadingScreenShow()
    else if (error) return errorNotify(`Error! ${error}`)
    const profile: ProfileType = {
        ...data.user,
    }
    const onClickBookmarkTab = () => {
        setIsActiveTab('Bookmarks')
        bookmarkQuery.refetch({
            user_id: Number(profile.id),
            first: 5,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        })
    }
    const onClickActivityTab = () => {
        setIsActiveTab('Activity')
        refetch({ slug: query.slug })
    }
    const onClickFollow = () => {
        toggleFollow({
            variables: {
                userId: data?.user.id,
            },
        })
    }
    const bookmarkOnPageChange = (first: number, page: number) => {
        bookmarkQuery.refetch({ first, page })
    }
    const onClickProfileEdit = () => {
        setIsEditing(true)
    }
    const onClickCancelProfileEdit = () => {
        setIsEditing(false)
    }
    const profileRefetchHandler = () => {
        setIsEditing(false)
        refetch()
        setUserID(
            profile.id,
            profile.first_name,
            profile.last_name,
            profile.email,
            profile.avatar,
            profile.slug,
            profile.teams,
            profile.updated_at
        )
    }
    return (
        <div className="mx-8 mt-10 flex h-full w-full flex-col gap-4">
            <div className="flex w-full flex-row gap-6">
                <div className="flex w-3/4 flex-col gap-4">
                    <div className="flex h-auto w-full">
                        <div className="relative flex w-full flex-row gap-14">
                            {!isEditing ? (
                                <ProfileInfo
                                    user_id={user_id}
                                    profile={profile}
                                    onClickProfileEdit={onClickProfileEdit}
                                />
                            ) : (
                                <ProfileInfoEdit
                                    user_id={user_id}
                                    profile={profile}
                                    profileRefetchHandler={profileRefetchHandler}
                                    onClickCancelProfileEdit={onClickCancelProfileEdit}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex w-full flex-row gap-14">
                        <div className="flex w-2/6 justify-center">
                            {user_id != data.user.id && (
                                <Button
                                    type="button"
                                    usage="follow"
                                    additionalClass="my-auto drop-shadow-xl"
                                    onClick={onClickFollow}
                                >
                                    {data.user.is_following ? 'Unfollow' : 'Follow'}
                                </Button>
                            )}
                        </div>
                        <div className="flex w-4/6 flex-row">
                            <div className="flex w-full flex-row gap-4 self-end">
                                <ProfileStats value={profile.reputation} text="Reputation" />
                                <ProfileStats value={profile.question_count} text="Questions" />
                                <ProfileStats value={profile.answer_count} text="Answers" />
                                <ProfileStats value={profile.follower_count} text="Followers" />
                                <ProfileStats value={profile.following_count} text="Following" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-1/4 grow">
                    {user_id == Number(data.user.id) && <RightSideBar usage="users" />}
                </div>
            </div>
            <div className="mt-3 flex h-3/5 flex-col">
                <div className="flex h-7 w-full flex-row justify-start border-b-2 border-gray-300">
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'Activity'
                        )}`}
                        onClick={onClickActivityTab}
                    >
                        Activity
                    </div>
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'Bookmarks'
                        )}`}
                        onClick={onClickBookmarkTab}
                    >
                        Bookmarks
                    </div>
                </div>
                {isActiveTab === 'Activity' && (
                    <div className="mb-6 mt-6 flex w-full flex-row justify-center gap-20 px-3">
                        <div className="w-1/2">
                            <p className="mx-3 mb-10 text-2xl">Top Questions</p>
                            {profile.top_questions.length > 0 ? (
                                <div className="mt-3 flex flex-col divide-y-2 divide-black border-2 border-black">
                                    {profile.top_questions.map((question, index) => (
                                        <Activity
                                            key={index}
                                            usage={'Question'}
                                            slug={question.slug}
                                            id={question.id}
                                            votes={question.vote_count}
                                            title={question.title}
                                            is_answered={question.is_answered}
                                            created_at={question.humanized_created_at}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-10 w-full text-center text-lg font-bold text-primary-gray">
                                    No top question to show
                                </div>
                            )}
                        </div>
                        <div className="w-1/2">
                            <p className="mx-3 mb-10 text-2xl">Top Answers</p>
                            {profile.top_answers.length > 0 ? (
                                <div className="mt-3 flex flex-col divide-y-2 divide-black border-2 border-black">
                                    {profile.top_answers.map((answer, index) => (
                                        <Activity
                                            key={index}
                                            usage="Answer"
                                            id={answer.id}
                                            slug={answer.question.slug}
                                            votes={answer.vote_count}
                                            content={answer.content}
                                            is_answered={answer.is_correct}
                                            created_at={answer.humanized_created_at}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-10 w-full text-center text-lg font-bold text-primary-gray">
                                    No top answer to show
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {isActiveTab === 'Bookmarks' &&
                    (bookmarkQuery.loading ? (
                        loadingScreenShow()
                    ) : bookmarkQuery.error ? (
                        errorNotify(`Error! ${bookmarkQuery.error}`)
                    ) : (
                        <BookmarkTabContent
                            bookmarks={bookmarkQuery.data.bookmarks.data}
                            pageInfo={bookmarkQuery.data.bookmarks.paginatorInfo}
                            onPageChange={bookmarkOnPageChange}
                        />
                    ))}
            </div>
        </div>
    )
}
export default ProfilePage
