import { Icons } from '@/components/atoms/Icons'
import TeamCard from '@/components/molecules/TeamCard'
import ViewToggle from '@/components/molecules/ViewToggle'
import QuestionGridItem from '@/components/organisms/QuestionGridItem'
import QuestionListItem from '@/components/organisms/QuestionListItem'
import GET_USER from '@/helpers/graphql/queries/get_user'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { errorNotify } from '@/helpers/toast'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const { ChevronIcon, DotsIcon } = Icons

interface UserType {
    id: number
    first_name: string
    last_name: string
    avatar: string
    question_count: number
    answer_count: number
    reputation: number
}

const getActiveTabClass = (status: boolean): string => {
    return `-mb-[0.5px] p-[0.625rem] font-bold cursor-pointer hover:text-primary-base
    ${status ? 'border-b-2 border-primary-base bg-primary-200' : ''}`
}

export type View = 'Grid' | 'List'
type Tab = 'Questions' | 'Answers' | 'Teams'

const UserDetail = (): JSX.Element => {
    const router = useRouter()

    const [view, setView] = useState<View>('List')

    const [activeTab, setActiveTab] = useState<Tab>('Questions')
    const userQuery = useQuery<{ user: UserType }>(GET_USER, {
        variables: { slug: router.query.slug },
    })

    if (userQuery.loading) return loadingScreenShow()
    if (userQuery.error) {
        errorNotify(`Error! ${userQuery.error?.message ?? ''}`)
        return <></>
    }

    const toggleView = (): void => {
        setView((prevView) => (prevView === 'List' ? 'Grid' : 'List'))
    }

    return (
        <div className="h-full rounded-[5px] border border-neutral-200 bg-white p-4 text-sm text-neutral-900">
            <div className="flex h-full flex-col gap-4">
                <div className="flex h-[37px] border-b-[0.5px] border-neutral-disabled">
                    <div
                        className={getActiveTabClass(activeTab === 'Questions')}
                        onClick={() => {
                            setActiveTab('Questions')
                        }}
                    >
                        Questions
                    </div>
                    <div
                        className={getActiveTabClass(activeTab === 'Answers')}
                        onClick={() => {
                            setActiveTab('Answers')
                        }}
                    >
                        Answers
                    </div>
                    <div
                        className={getActiveTabClass(activeTab === 'Teams')}
                        onClick={() => {
                            setActiveTab('Teams')
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
                        <div className="flex gap-[2px] rounded-[5px] border border-neutral-900 p-2">
                            <span>Date</span>
                            <div className="m-auto">
                                <ChevronIcon />
                            </div>
                        </div>
                        <div className="flex rounded-[5px] border border-neutral-900 p-2">
                            <span>Filter</span>
                            <div className="m-auto">
                                <DotsIcon />
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'Teams' ? (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <TeamCard
                            name="Sun Overflow"
                            description="Lorem ipsum dolor sit amet consectetur. Sed amet at id sit proin in. Lorem ipsum
                    dolor sit amet consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit
                    amet consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit amet
                    consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit amet
                    consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit amet
                    consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit amet
                    consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit amet
                    consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit amet
                    consectetur. Sed amet at id sit proin in."
                            usersCount={123}
                        />
                        <TeamCard
                            name="MetaJobs"
                            description="Lorem ipsum dolor sit amet consectetur. Sed amet at id sit proin in."
                            usersCount={444}
                        />
                        <TeamCard
                            name="Meetsone"
                            description="Lorem ipsum dolor sit amet consectetur. Sed amet at id sit proin in."
                            usersCount={55}
                        />
                        <TeamCard
                            name="Zeon"
                            description="Lorem ipsum dolor sit amet consectetur. Sed amet at id sit proin in."
                            usersCount={24}
                        />
                        <TeamCard
                            name="OsakaMetro"
                            description="Lorem ipsum dolor sit amet consectetur. Sed amet at id sit proin in."
                            usersCount={12}
                        />
                        <TeamCard
                            name="Prrr"
                            description="Lorem ipsum dolor sit amet consectetur. Sed amet at id sit proin in."
                            usersCount={100}
                        />
                    </div>
                ) : view === 'List' ? (
                    <div className="flex w-full flex-col justify-center gap-4">
                        <QuestionListItem id={1} privacy="Public" />
                        <QuestionListItem id={2} privacy="Private" />
                        <QuestionListItem id={3} privacy="Private" />
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <QuestionGridItem />
                        <QuestionGridItem />
                        <QuestionGridItem />
                        <QuestionGridItem />
                        <QuestionGridItem />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserDetail
