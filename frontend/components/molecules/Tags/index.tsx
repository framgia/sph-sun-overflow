import Pill from '../Pill'
import { Popover } from '@headlessui/react'
import Tooltips from '../Tooltip';
import { useState } from 'react';
import { usePopper } from 'react-popper'

type TagsProps = {
    values: { id: number; name: string; is_watched_by_user: boolean }[]
}

const Tags = ({ values }: TagsProps): JSX.Element => {
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement)
  
    return (
        <Popover className="relative">
            <Popover.Button ref={setReferenceElement}>
                <div className="flex w-full justify-start gap-2">
                    {values.map((value) => {
                        return <Pill key={value.id} name={value.name} is_tag={value.is_watched_by_user} />
                    })}
                </div>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 mt-3 max-w-sm px-4 shadow-lg sm:px-0 sm:max-w-s bg-zinc-100 rounded-lg"
             ref={setPopperElement}
             style={styles.popper}
             {...attributes.popper}>
                <Tooltips></Tooltips>
            </Popover.Panel>
        </Popover>
    )
}

export default Tags
