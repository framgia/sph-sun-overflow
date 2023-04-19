import { Icons } from '@/components/atoms/Icons'
import type { TagType } from '@/pages/questions/[slug]'

const { EyeIcon } = Icons

type TagProps = {
    tag: TagType
}

const Tag = ({ tag }: TagProps): JSX.Element => {
    return (
        <div className="flex gap-[0.15rem] rounded-xl bg-neutral-200 px-2 py-[0.15rem] text-xs">
            {tag.is_watched_by_user && (
                <div className="m-auto">
                    <EyeIcon />
                </div>
            )}
            <span className="text-neutral-900 line-clamp-1" title={tag.name}>
                {tag.name}
            </span>
        </div>
    )
}

export default Tag
