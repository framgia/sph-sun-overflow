import { CustomIcons } from '@/components/atoms/Icons'
import type { TagType } from '@/pages/questions/[slug]'

const { EyeIcon } = CustomIcons

type TagProps = {
    tag: TagType
}

const Tag = ({ tag }: TagProps): JSX.Element => {
    return (
        <div className="flex h-4 items-center gap-[2px] rounded-xl bg-neutral-200 px-1 py-[2px] text-[10px]">
            {tag.is_watched_by_user && (
                <div className="">
                    <EyeIcon />
                </div>
            )}
            <span className="text-neutral-900" title={tag.name}>
                {tag.name}
            </span>
        </div>
    )
}

export default Tag
