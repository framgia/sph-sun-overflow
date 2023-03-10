import Icons from '@/components/atoms/Icons'
import { Popover } from '@headlessui/react'
import Tooltips from '../Tooltip'
import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { Float } from '@headlessui-float/react'
import { useBoundStore } from '@/helpers/store'
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

const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
}

const Pill = ({ tag }: PillProps): JSX.Element => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    let watchedTags = useBoundStore((state) => state.watchedTags)

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
                    className="absolute z-10 mt-3 w-96 rounded-lg bg-zinc-200 shadow-lg"
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    onClick={(e) => handleClick(e)}
                >
                    <div ref={setArrowElement} style={styles.arrow}>
                        <Float.Arrow className="relative ml-3 h-6 w-6 rotate-45 bg-zinc-200" />
                    </div>
                    <Tooltips tag={tag} />
                </Popover.Panel>
            </Float>
        </Popover>
    )
}

export default Pill
