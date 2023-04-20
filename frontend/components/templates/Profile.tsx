import { omit } from 'lodash'
import ProfileCard, { type ProfileCardProps } from '../molecules/ProfileCard'
import SummaryCard from '../molecules/SummaryCard'
import { type ITag } from '../molecules/TagsInput'
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
    top_answers: Array<TSummaryCard & { question: { slug: string } }>
    bookmarked_questions: Array<{
        bookmarkable: TSummaryCard
    }>
    bookmarked_answers: Array<{
        bookmarkable: TSummaryCard & { question: { slug: string } }
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
    const renderActivities = (): JSX.Element => {
        return (
            <div className=" w-full space-y-4 bg-white pb-4 drop-shadow-md">
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
                                className="grid grid-cols-2 gap-4 lg:grid-cols-3
                            "
                            >
                                {data.top_questions.map((question, index) => {
                                    return (
                                        <SummaryCard
                                            {...question}
                                            key={index}
                                            date={question.updated_at}
                                            isBookmarked={false}
                                        />
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
                                className="grid grid-cols-3 gap-4 lg:grid-cols-4
                            "
                            >
                                {data.top_answers.map((answer, index) => {
                                    return (
                                        <SummaryCard
                                            key={index}
                                            {...answer}
                                            date={answer.updated_at}
                                            slug={answer.question.slug}
                                        />
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
            <div className="w-full space-y-4 bg-white  drop-shadow-md">
                <div className="bg-primary-200  p-2 font-semibold leading-6">BOOKMARKS</div>
                <div className=" grid grid-cols-2 px-4">
                    <div className=" space-y-4 p-4">
                        <div className="font-semibold leading-[145%]">Questions</div>
                        <div className="no-scrollbar flex max-h-[600px] flex-col gap-4 overflow-y-scroll">
                            {data.bookmarked_questions.length === 0 && (
                                <div className="py-2 text-center text-primary-gray">
                                    No Bookmarked Questions
                                </div>
                            )}
                            {data.bookmarked_questions.map(
                                ({ bookmarkable: question }, index): JSX.Element => {
                                    return (
                                        <SummaryCard
                                            key={index}
                                            {...question}
                                            content={undefined}
                                            date={question.updated_at}
                                            isBookmarked={true}
                                        />
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <div className="space-y-4 p-4">
                        <div className="font-semibold leading-[145%]">Answers</div>
                        <div className="no-scrollbar flex max-h-[600px] flex-col gap-4 overflow-y-scroll">
                            {data.bookmarked_answers.length === 0 && (
                                <div className="py-2 text-center text-primary-gray">
                                    No Bookmarked Answers
                                </div>
                            )}
                            {data.bookmarked_answers.map(
                                ({ bookmarkable: answer }, index): JSX.Element => {
                                    return (
                                        <SummaryCard
                                            key={index}
                                            {...answer}
                                            date={answer.updated_at}
                                            slug={answer.question.slug}
                                            isBookmarked={true}
                                        />
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
        <div className="flex flex-col gap-10 p-[56px] lg:flex-row ">
            <ProfileCard
                {...omit(data, ['top_questions', 'top_answers'])}
                toggleFollow={toggleFollow}
                isPublic={isPublic}
            />
            <div className="w-full space-y-6 ">
                {renderActivities()}
                {renderBookmarks()}
            </div>
        </div>
    )
}
export default ProfileLayout
