import { CustomIcons } from '@/components/atoms/Icons'
import type { TagType } from '@/pages/questions/[slug]'
import { useRouter } from 'next/router'
import React from 'react'

const { EyeIcon } = CustomIcons

type TagProps = {
    tag: TagType
}

const Tag = ({ tag }: TagProps): JSX.Element => {
    const router = useRouter()

    const handleRedirect = async (e: React.MouseEvent): Promise<void> => {
        e.stopPropagation()
        await router.push(`/questions/tagged/${tag.slug}`)
    }
    return (
        <div
            className="flex h-4 cursor-pointer items-center gap-[2px] rounded-xl bg-neutral-200 px-1 py-[2px] text-[10px]"
            onClick={async (e) => {
                await handleRedirect(e)
            }}
        >
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
