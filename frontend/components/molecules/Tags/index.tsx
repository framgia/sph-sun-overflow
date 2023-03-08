import Pill from '../Pill'

type TagsProps = {
    values: {
        id: number
        slug?: string | null
        name: string
        description?: string | null
        is_watched_by_user: boolean
        count_tagged_questions?: number | null
        count_watching_users?: number | null
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
