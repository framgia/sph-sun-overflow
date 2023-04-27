import DropdownFilters from '@/components/molecules/DropdownFilters'
import ProfileCard from '@/components/molecules/ProfileCard'
import TeamCard from '@/components/molecules/TeamCard'
import ViewToggle from '@/components/molecules/ViewToggle'
import Paginate from '@/components/organisms/Paginate'
import QuestionGridItem from '@/components/organisms/QuestionGridItem'
import QuestionListItem from '@/components/organisms/QuestionListItem'
import { type PaginatorInfo } from '@/components/templates/QuestionsPageLayout'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { answerFilterOption, orderByOptions } from '@/pages/questions'
import { useRouter } from 'next/router'
import useTabData from './hooks/useTabData'

export type View = 'Grid' | 'List'
export type Tab = 'Questions' | 'Answers' | 'Teams'

const getActiveTabClass = (status: boolean): string => {
    return `-mb-[0.5px] p-[0.625rem] font-bold cursor-pointer hover:text-primary-base
    ${status ? 'border-b-2 border-primary-base bg-primary-200' : ''}`
}

const UserDetail = (): JSX.Element => {
    const router = useRouter()
    const view = String(router.query.view ?? 'List') as View
    const activeTab = (router.query.tab ?? 'Questions') as Tab
    const order = orderByOptions[String(router.query.order ?? 'Newest first')]
    const answerFilter = answerFilterOption[String(router.query.filter ?? '')]

    const {
        userData,
        userQuestions,
        userAnswers,
        userTeams,
        loading,
        error,
        questionsRefetch,
        answersRefetch,
        teamsRefetch,
    } = useTabData(activeTab, view)

    if (loading) return loadingScreenShow()
    if (error) {
        return <>{errorNotify(`Error! ${error?.message ?? ''}`)}</>
    }

    const onPageChange = async (first: number, page: number): Promise<void> => {
        switch (activeTab) {
            case 'Questions':
                void questionsRefetch({
                    first,
                    page,
                    filter: { user_slug: router.query.slug as string, ...answerFilter },
                    orderBy: [order],
                })
                break
            case 'Answers':
                void answersRefetch({
                    first,
                    page,
                    filter: { user_slug: router.query.slug as string, ...answerFilter },
                    orderBy: [order],
                })
                break
            case 'Teams':
                void teamsRefetch({
                    first,
                    page,
                    user_slug: router.query.slug as string,
                })
        }
    }

    const getPageInfo = (): PaginatorInfo | undefined => {
        switch (activeTab) {
            case 'Questions':
                return userQuestions?.paginatorInfo
            case 'Answers':
                return userAnswers?.paginatorInfo
            case 'Teams':
                return userTeams?.paginatorInfo
        }
    }

    const toggleView = (): void => {
        void router.push({
            pathname: router.pathname,
            query: { ...router.query, view: view === 'List' ? 'Grid' : 'List' },
        })
    }

    const renderEmptyList = (): JSX.Element => {
        return (
            <div className="flex justify-center">
                <span>No {activeTab} to Show</span>
            </div>
        )
    }

    const renderUserQuestions = (): JSX.Element[] | null => {
        return (
            userQuestions?.data.map((question) => {
                const questionProps = {
                    key: question.id,
                    slug: question.slug,
                    title: question.title,
                    content: question.content,
                    voteCount: question.vote_count,
                    answerCount: question.answers?.length,
                    viewCount: question.views_count,
                    isPublic: question.is_public,
                    tags: question.tags,
                    author: question.user,
                }
                return view === 'List' ? (
                    <QuestionListItem
                        {...questionProps}
                        createdAt={question.humanized_created_at}
                    />
                ) : (
                    <QuestionGridItem
                        {...questionProps}
                        upvotePercentage={question.upvote_percentage}
                        createdAt={question.created_at}
                    />
                )
            }) ?? null
        )
    }

    const renderUserAnswers = (): JSX.Element[] | null => {
        return (
            userAnswers?.data.map((answer) => {
                const { question } = answer

                const questionProps = {
                    key: question.id,
                    slug: question.slug,
                    title: question.title,
                    content: question.content,
                    voteCount: question.vote_count,
                    answerCount: question.answers?.length,
                    viewCount: question.views_count,
                    isPublic: question.is_public,
                    tags: question.tags,
                    author: question.user,
                }
                return view === 'List' ? (
                    <QuestionListItem
                        {...questionProps}
                        createdAt={question.humanized_created_at}
                    />
                ) : (
                    <QuestionGridItem
                        {...questionProps}
                        upvotePercentage={question.upvote_percentage}
                        createdAt={question.created_at}
                    />
                )
            }) ?? null
        )
    }

    const tabHandler = (tab: Tab): void => {
        void router.push({
            pathname: router.pathname,
            query: { ...router.query, tab },
        })
    }

    const pageInfo = getPageInfo()
    const user = userData.user
    return (
        <div className="flex flex-col gap-4 p-4 xl:flex-row">
            <ProfileCard isAdmin {...user} isPublic={true} toggleFollow={() => {}} />
            <div className="h-full w-full rounded-[5px] border border-neutral-200 bg-white p-4 text-sm text-neutral-900">
                <div className="flex h-full flex-col gap-4">
                    <div className="flex h-[37px] border-b-[0.5px] border-neutral-disabled">
                        <div
                            className={getActiveTabClass(activeTab === 'Questions')}
                            onClick={() => {
                                tabHandler('Questions')
                            }}
                        >
                            Questions
                        </div>
                        <div
                            className={getActiveTabClass(activeTab === 'Answers')}
                            onClick={() => {
                                const { query } = router
                                delete query.filter
                                tabHandler('Answers')
                            }}
                        >
                            Answers
                        </div>
                        <div
                            className={getActiveTabClass(activeTab === 'Teams')}
                            onClick={() => {
                                const { query } = router
                                delete query.view
                                delete query.order
                                delete query.filter
                                tabHandler('Teams')
                            }}
                        >
                            Teams
                        </div>
                    </div>
                    {activeTab !== 'Teams' && (
                        <div className="flex justify-end gap-1">
                            <div onClick={toggleView}>
                                <ViewToggle view={view} />
                            </div>
                            <div className="">
                                <DropdownFilters
                                    triggers={
                                        activeTab === 'Questions' ? ['DATE', 'ANSWER'] : ['DATE']
                                    }
                                />
                            </div>
                        </div>
                    )}
                    {activeTab === 'Teams' ? (
                        <div>
                            {!userTeams && renderEmptyList()}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                {userTeams?.data.map((team) => {
                                    return (
                                        <TeamCard
                                            key={team.id}
                                            slug={team.slug ?? ''}
                                            name={team.name}
                                            description={team.description}
                                            usersCount={team.members_count}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    ) : view === 'List' ? (
                        <div>
                            {!userQuestions && !userAnswers && renderEmptyList()}
                            <div className="flex w-full flex-col justify-center gap-4">
                                {activeTab === 'Questions'
                                    ? renderUserQuestions()
                                    : renderUserAnswers()}
                            </div>
                        </div>
                    ) : (
                        <div>
                            {!userQuestions && !userAnswers && renderEmptyList()}
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                {activeTab === 'Questions'
                                    ? renderUserQuestions()
                                    : renderUserAnswers()}
                            </div>
                        </div>
                    )}
                    {pageInfo && pageInfo.lastPage > 1 && (
                        <Paginate {...pageInfo} onPageChange={onPageChange} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDetail
