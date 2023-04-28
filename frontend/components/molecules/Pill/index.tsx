import Icons from '@/components/atoms/Icons'
import { useBoundStore } from '@/helpers/store'
import { Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import Tooltips from '../TagPopover'

type PillProps = {
    tag: {
        id: number
        slug?: string | null
        name: string
        description?: string | null
        is_watched_by_user: boolean
        count_tagged_questions?: number | null
        count_watching_users?: number | null
    }
}

const Pill = ({ tag }: PillProps): JSX.Element => {
    const watchedTags = useBoundStore((state) => state.watchedTags)

    return (
        <Popover
            placement="bottom-start"
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
            }}
        >
            <PopoverHandler>
                <div className="flex min-w-fit cursor-pointer flex-row items-center gap-1 rounded-full bg-red-300 px-3 py-1 text-xs font-normal text-gray-900 !outline-none">
                    {watchedTags.some((tempTag) => tempTag.name === tag.name) && (
                        <Icons name="pill_eye" />
                    )}
                    <span className="text-gray-900 line-clamp-1" title={tag.name}>
                        {tag.name}
                    </span>
                </div>
            </PopoverHandler>
            <PopoverContent className="max-w-[22rem] bg-gray-200">
                <Tooltips tag={tag} />
            </PopoverContent>
        </Popover>
    )
}

export default Pill
