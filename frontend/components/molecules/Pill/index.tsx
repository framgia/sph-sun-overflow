import Icons from '@/components/atoms/Icons'
import { useBoundStore } from '@/helpers/store'
import { Float } from '@headlessui-float/react'
import { Popover } from '@headlessui/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import Tooltips from '../Tooltip'
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
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    const watchedTags = useBoundStore((state) => state.watchedTags)

    return (
        <Popover>
            <Float placement="bottom-start" offset={5} arrow>
                <Popover.Button type="button" className="!outline-none">
                    <div
                        className="flex min-w-fit flex-row items-center gap-1 rounded-full bg-red-300 py-1 px-3 text-xs font-normal !outline-none"
                        ref={setReferenceElement}
                    >
                        {watchedTags.some((tempTag) => tempTag.name === tag.name) && (
                            <Icons name="pill_eye" />
                        )}
                        <span>{tag.name}</span>
                    </div>
                </Popover.Button>
                <Popover.Panel
                    className="bg-zinc-200 absolute z-10 mt-3 w-96 rounded-lg shadow-lg"
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <div ref={setArrowElement} style={styles.arrow}>
                        <Float.Arrow className="bg-zinc-200 relative ml-3 h-6 w-6 rotate-45" />
                    </div>
                    <Tooltips tag={tag} />
                </Popover.Panel>
            </Float>
        </Popover>
    )
}

export default Pill
