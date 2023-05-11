import Link from 'next/link'
import Icons from '../atoms/Icons'

type Props = {
    header: string | JSX.Element
    children: JSX.Element
    closeRedirect?: string
}

const ContentCard = ({ header, children, closeRedirect }: Props): JSX.Element => {
    return (
        <div className="flex w-full flex-col rounded-smd border border-neutral-200 bg-neutral-white drop-shadow-xsm">
            <div className="flex h-13 w-full items-center justify-between bg-primary-200 p-4 font-semibold text-neutral-900">
                {header}
                {closeRedirect && closeRedirect.length > 0 && (
                    <Link
                        href={closeRedirect}
                        className="float-right flex flex-row items-center gap-px text-sm font-normal hover:text-primary-base"
                    >
                        Close
                        <Icons name="exit" />
                    </Link>
                )}
            </div>
            {children}
        </div>
    )
}

export default ContentCard
