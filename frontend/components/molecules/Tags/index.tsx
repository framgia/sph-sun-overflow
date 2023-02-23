import Pill from '../Pill'

type TagsProps = {
    values: {
        id: number
        slug: string
        name: string
        description: string
        is_watched_by_user: boolean
        count_tagged_questions: number
        count_watching_users: number
    }[]
}

const Tags = ({ values }: TagsProps): JSX.Element => {
    return (
        <div className="flex w-full justify-start gap-2">
            {values?.map((value) => {
                return <Pill key={value.id} tag={value} />
            })}
        </div>
    )
}

export default Tags
