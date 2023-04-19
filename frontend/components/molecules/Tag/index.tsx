import type { TagType } from '@/pages/questions/[slug]'
import React from 'react'

type TagProps = {
    tag: TagType
}

const Tag: React.FC<TagProps> = ({ tag }) => {
    return (
        <div className="flex gap-[0.15rem] rounded-xl bg-neutral-200 px-2 py-[0.15rem] text-xs">
            {tag.is_watched_by_user && <img className="w-4" src="/svg/Eye.svg" alt="Eye" />}
            <span className="text-neutral-900 line-clamp-1" title={tag.name}>
                {tag.name}
            </span>
        </div>
    )
}

export default Tag
