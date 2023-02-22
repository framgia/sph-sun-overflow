import Button from '@/components/atoms/Button'
import ProfileImage from '@/components/atoms/ProfileImage'
import ProfileStats from '@/components/atoms/ProfileStats'
import AboutMe from '@/components/molecules/AboutMe'
import Activity from '@/components/molecules/Activity'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useState } from 'react'
import { RightSideBar } from '@/components/organisms/Sidebar'
import { TagType, UserType } from '../questions/[slug]'
import { PaginatorInfo } from '../questions'
import BookmarkTabContent from '@/components/organisms/BookmarkTabContent'
import GET_BOOKMARKS from '@/helpers/graphql/queries/get_bookmarks'

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
    const [isActiveTab, setIsActiveTab] = useState('Activity')

    const router = useRouter()
    const query = router.query
    const { data, loading, error, refetch } = useQuery(GET_USER, {
        variables: {
            slug: query.slug,
        },
    })

    const profileIsNull = (): boolean => {
        if (data === null) {
            return true
        }

        return false
    }

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

    const topQuestions = [
        {
            id: 1,
            votes: 0,
            is_answered: true,
            question: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 2,
            votes: 78,
            is_answered: true,
            question: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 3,
            votes: 100,
            is_answered: true,
            question: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 4,
            votes: 23,
            is_answered: true,
            question: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 5,
            votes: 10,
            is_answered: false,
            question: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
    ]

    const topAnswers = [
        {
            id: 1,
            votes: 5,
            is_answered: true,
            answer: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 2,
            votes: 78,
            is_answered: false,
            answer: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 3,
            votes: 100,
            is_answered: true,
            answer: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 4,
            votes: 23,
            is_answered: false,
            answer: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
        {
            id: 5,
            votes: 10,
            is_answered: false,
            answer: 'Material Design not styling lorem',
            created_at: 'Dec. 20, 2023',
        },
    ]

    const onClickBookmarkTab = () => {
        setIsActiveTab('Bookmarks')
        bookmarkQuery.refetch({
            user_id: Number(profile.id),
            first: 5,
            page: 1,
            orderBy: [{ column: 'CREATED_AT', order: 'DESC' }],
        })
    }

    const bookmarkOnPageChange = (first: number, page: number) => {
        bookmarkQuery.refetch({ first, page })
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
                <div className="flex h-7 w-full flex-row justify-start border-b-2 border-gray-300">
                    <div
                        className={`h-7 min-w-[120px] text-center hover:cursor-pointer ${getActiveTabClass(
                            isActiveTab === 'Activity'
                        )}`}
                        onClick={() => setIsActiveTab('Activity')}
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
                    <div className="flex w-full flex-row justify-center gap-20 px-3">
                        <div className="mb-6">
                            <p className="mt-6 mb-10 text-2xl">Top Questions</p>
                            <div className="mt-3 flex flex-col divide-y-2 divide-black border-2 border-black">
                                {topQuestions.map((question, index) => (
                                    <Activity
                                        key={index}
                                        id={question.id}
                                        votes={question.votes}
                                        data={question.question}
                                        is_answered={question.is_answered}
                                        created_at={question.created_at}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <p className="mt-6 mb-10 text-2xl">Top Answers</p>
                            <div className="mt-3 flex flex-col divide-y-2 divide-black border-2 border-black">
                                {topAnswers.map((answer, index) => (
                                    <Activity
                                        key={index}
                                        id={answer.id}
                                        votes={answer.votes}
                                        data={answer.answer}
                                        is_answered={answer.is_answered}
                                        created_at={answer.created_at}
                                    />
                                ))}
                            </div>
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
