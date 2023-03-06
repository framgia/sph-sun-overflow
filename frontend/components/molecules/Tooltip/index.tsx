import Button from '@/components/atoms/Button'
import { ADD_WATCHED_TAG, REMOVE_WATCHED_TAG } from '@/helpers/graphql/mutations/sidebar'
import GET_QUESTIONS from '@/helpers/graphql/queries/get_questions'
import { QTagsSidebar } from '@/helpers/graphql/queries/sidebar'
import { errorNotify, successNotify } from '@/helpers/toast'
import { useMutation } from '@apollo/client'
import Link from 'next/link'

type TagType = {
    tag: {
        id: number
        slug: string
        name: string
        description: string
        is_watched_by_user: boolean
        count_tagged_questions: number
        count_watching_users: number
    }
}

const Tooltips = ({ tag }: TagType): JSX.Element => {
    const [addWatchedTagAPI] = useMutation(ADD_WATCHED_TAG, {
        refetchQueries: [
            { query: QTagsSidebar },
            'TagsSidebar',
            { query: GET_QUESTIONS },
            'Questions',
        ],
        onCompleted: (data) => {
            if (data.addWatchedTag == 'Successfully added the tag') {
                successNotify(data.addWatchedTag)
            } else {
                errorNotify(data.addWatchedTag)
            }
        },
    })
    const [removeWatchedTagAPI] = useMutation(REMOVE_WATCHED_TAG, {
        refetchQueries: [
            { query: QTagsSidebar },
            'TagsSidebar',
            { query: GET_QUESTIONS },
            'Questions',
        ],

        onCompleted: (data) => {
            if (data.removeWatchedTag == 'Successfully removed tag from WatchList') {
                successNotify(data.removeWatchedTag)
            } else {
                errorNotify(data.removeWatchedTag)
            }
        },
    })

    const toggleTagWatch = () => {
        if (tag.is_watched_by_user) removeWatchedTagAPI({ variables: { tagId: tag.id } })
        else addWatchedTagAPI({ variables: { tagId: tag.id } })
    }

    return (
        <div className="p-5">
            <div className="flex items-center">
                <p className="mr-20 text-red-700">{tag.count_watching_users} Watchers</p>
                <p className="mr-2">{tag.count_tagged_questions} Questions</p>
            </div>
            <div className=" cursor-pointer py-2">
                <p>
                    {tag.description}
                    <Link href={`/questions/tagged/${tag.slug}`} className="ml-2 underline ">
                        View Tag
                    </Link>
                </p>
            </div>
            <div className="float-right ml-2 mb-2 p-2">
                <Button usage="popover" type="submit" onClick={() => toggleTagWatch()}>
                    {`${tag.is_watched_by_user ? 'Unw' : 'W'}atch Tag`}
                </Button>
            </div>
        </div>
    )
}

export default Tooltips
