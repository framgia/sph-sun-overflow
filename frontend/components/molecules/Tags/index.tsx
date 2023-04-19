import type { TagType } from '@/pages/questions/[slug]'
import Tag from '../Tag'

type TagsProps = {
    values: TagType[]
}

const Tags = ({ values }: TagsProps): JSX.Element => {
    return (
        <div className="flex flex-wrap gap-1">
            {values?.map((value) => {
                return <Tag key={value.id} tag={value} />
            })}
        </div>
    )
}

export default Tags
