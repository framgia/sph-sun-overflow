import { omit } from 'lodash'
import { Fragment, useState } from 'react'
import ProfileCard, { type ProfileCardProps } from '../molecules/ProfileCard'
import SummaryCard from '../molecules/SummaryCard'
import { type ITag } from '../molecules/TagsInput'
import EditProfileModal from '../organisms/EditProfileModal'
import FollowModal from '../organisms/FollowModal'
type MITag = ITag & { is_watched_by_user: boolean }

type TSummaryCard = {
    id: number
    title?: string
    content: string
    tags: MITag[]
    updated_at: string
    upvote_percentage: number
    slug: string
}

export type TFollowInstance = {
    id: number
    first_name: string
    last_name: string
    slug: string
    avatar: string
    is_following: boolean
    role: {
        name: string
    }
}

type ProfileQuestionData = {
    top_questions: TSummaryCard[]
    top_answers: Array<TSummaryCard & { question: { slug: string; title: string } }>
    bookmarked_questions: Array<{
        bookmarkable: TSummaryCard
    }>
    bookmarked_answers: Array<{
        bookmarkable: TSummaryCard & { question: { slug: string; title: string } }
    }>
}

export type ProfileFollowData = {
    followers: Array<{
        follower: TFollowInstance
    }>
    following: Array<{
        following: TFollowInstance
    }>
}
type ProfileData = ProfileCardProps & ProfileQuestionData & ProfileFollowData

type ProfileLayoutProps = {
    data: ProfileData
    toggleFollow: (input: { variables: { userId: number } }) => void
    isPublic: boolean
}

const ProfileLayout = ({ data, toggleFollow, isPublic }: ProfileLayoutProps): JSX.Element => {
    console.log(data)
    const [isOpenFollower, setIsOpenFollower] = useState<boolean>(false)
    const [isOpenFollowing, setIsOpenFollowing] = useState<boolean>(false)
    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)

    const handleFollower = (input: boolean): void => {
        setIsOpenFollower(input)
    }
    const handleFollowing = (input: boolean): void => {
        setIsOpenFollowing(input)
    }
    const handleEdit = (input: boolean): void => {
        setIsOpenEdit(input)
    }

    const renderActivities = (): JSX.Element => {
        return (
            <div className=" w-full space-y-4  bg-white pb-4 drop-shadow-md">
                <div className="bg-primary-200  p-2 font-semibold leading-6">ACTIVITY</div>
                <div className="space-y-4 px-2">
                    <div className="space-y-4 p-4">
                        <div className="font-semibold leading-[145%]">Top Questions</div>
                        {data.top_questions.length === 0 ? (
                            <div className="py-2 text-center text-primary-gray">
                                No Top Questions to Show
                            </div>
                        ) : (
                            <div
                                className="flex flex-row flex-wrap gap-4
                            "
                            >
                                {data.top_questions.map((question, index) => {
                                    return (
                                        <div className="w-[288px]" key={index}>
                                            <SummaryCard
                                                {...question}
                                                key={index}
                                                date={question.updated_at}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <div className="space-y-4 p-4">
                        <div className=" font-semibold leading-[145%]">Top Answers</div>
                        {data.top_answers.length === 0 ? (
                            <div className="py-2 text-center text-primary-gray">
                                No Top Answers to Show
                            </div>
                        ) : (
                            <div
                                className="flex flex-row flex-wrap justify-items-stretch gap-4
                            "
                            >
                                {data.top_answers.map((answer, index) => {
                                    return (
                                        <div className="w-[288px]" key={index}>
                                            <SummaryCard
                                                {...answer}
                                                date={answer.updated_at}
                                                slug={answer.question.slug}
                                                title={answer.question.title}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    const renderBookmarks = (): JSX.Element => {
        if (isPublic) return <></>
        return (
            <div className="w-full space-y-4 bg-white drop-shadow-md">
                <div className="bg-primary-200  p-2 font-semibold leading-6">BOOKMARKS</div>
                <div className="flex flex-col gap-4 p-4 lg:flex-row">
                    <div className="space-y-4">
                        <div className="font-semibold leading-[145%]">Questions</div>
                        <div className="no-scrollbar flex max-h-[500px] flex-col space-y-4 overflow-y-scroll">
                            {data.bookmarked_questions.length === 0 && (
                                <div className="py-2 text-center text-primary-gray">
                                    No Bookmarked Questions
                                </div>
                            )}
                            {data.bookmarked_questions.map(
                                ({ bookmarkable: question }, index): JSX.Element => {
                                    return (
                                        <div className="max-h-24 max-w-[396px]" key={index}>
                                            <SummaryCard
                                                {...question}
                                                content={undefined}
                                                date={question.updated_at}
                                                isBookmarked={true}
                                                bookmarkType="Question"
                                            />
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="font-semibold leading-[145%]">Answers</div>
                        <div className="no-scrollbar flex max-h-[500px] flex-col space-y-4 overflow-y-scroll">
                            {data.bookmarked_answers.length === 0 && (
                                <div className="py-2 text-center text-primary-gray">
                                    No Bookmarked Answers
                                </div>
                            )}
                            {data.bookmarked_answers.map(
                                ({ bookmarkable: answer }, index): JSX.Element => {
                                    return (
                                        <div className="max-w-[396px]" key={index}>
                                            <SummaryCard
                                                key={index}
                                                {...answer}
                                                date={answer.updated_at}
                                                slug={answer.question.slug}
                                                isBookmarked={true}
                                                bookmarkType="Answer"
                                                title={answer.question.title}
                                            />
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Fragment>
            <div className=" flex flex-col space-y-4 xl:flex-row xl:space-y-0 xl:space-x-4">
                <ProfileCard
                    {...omit(data, ['top_questions', 'top_answers'])}
                    toggleFollow={toggleFollow}
                    isPublic={isPublic}
                    handleFollower={handleFollower}
                    handleFollowing={handleFollowing}
                    handleEditModal={handleEdit}
                />
                <div className="flex flex-shrink flex-col space-y-4">
                    {renderActivities()}
                    {renderBookmarks()}
                </div>
            </div>
            <FollowModal
                title="Followers"
                content={data.followers}
                isOpen={isOpenFollower}
                setIsOpen={handleFollower}
                toggleFollow={toggleFollow}
            />
            <FollowModal
                title="Following"
                content={data.following}
                isOpen={isOpenFollowing}
                setIsOpen={handleFollowing}
                toggleFollow={toggleFollow}
            />
            <EditProfileModal
                first_name={data.first_name}
                last_name={data.last_name}
                about_me={data.about_me}
                avatar={data.avatar}
                updated_at={data.updated_at}
                isOpen={isOpenEdit}
                setIsOpen={handleEdit}
            />
        </Fragment>
    )
}
export default ProfileLayout
