import Icons from '@/components/atoms/Icons'
import { Popover } from '@headlessui/react'
import Tooltips from '../Tooltip'
import React, { useState } from 'react'
import { usePopper } from 'react-popper'
import { Float } from '@headlessui-float/react'

type PillProps = {
    name: string
    is_tag: boolean
}

const Pill = ({ name, is_tag }: PillProps): JSX.Element => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>()
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>()
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    return (
        <Popover>
            <Float placement="bottom-start" offset={5} arrow>
                <Popover.Button type="button">
                    <div
                        className="flex min-w-fit flex-row items-center gap-1 rounded-full bg-red-300 py-1 px-3 text-xs font-normal"
                        ref={setReferenceElement}
                    >
                        {is_tag ? <Icons name="pill_eye" /> : ''}
                        <span>{name}</span>
                    </div>
                </Popover.Button>
                <Popover.Panel
                    className="absolute z-10 mt-3 w-96 rounded-lg bg-zinc-200 shadow-lg"
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                >
                    <div ref={setArrowElement} style={styles.arrow}>
                        <Float.Arrow className="relative ml-3 h-6 w-6 rotate-45 bg-zinc-200" />
                    </div>
                    <Tooltips />
                </Popover.Panel>
            </Float>
        </Popover>
    )
}

export default Pill
