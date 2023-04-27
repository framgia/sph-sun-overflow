import { CustomIcons } from '@/components/atoms/Icons'
import type { TagType } from '@/pages/questions/[slug]'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import TagPopover from '../TagPopover'

const { EyeIcon } = CustomIcons

type TagProps = {
    tag: TagType
}

const Tag = ({ tag }: TagProps): JSX.Element => {
    return (
        <Popover
            placement="bottom-start"
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
            }}
        >
            <PopoverHandler>
                <div className="flex h-4 cursor-pointer items-center gap-[2px] rounded-xl bg-neutral-200 px-1 py-[2px] text-[10px]">
                    {tag.is_watched_by_user && (
                        <div>
                            <EyeIcon />
                        </div>
                    )}
                    <span className="text-neutral-900" title={tag.name}>
                        {tag.name}
                    </span>
                </div>
            </PopoverHandler>
            <PopoverContent className="z-20 rounded-[5px] border-neutral-200 bg-neutral-100 px-0 py-2">
                <TagPopover tag={tag} />
            </PopoverContent>
        </Popover>
    )
}

export default Tag
