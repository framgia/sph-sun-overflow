import Link from 'next/link'
import Icons from '../Icons'

type Props = {
    href: string
    icon: string
    title: string
    onClick?: () => void
}
const LinkAction = ({ href, icon, title, onClick }: Props): JSX.Element => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group/action flex flex-row items-center gap-0.5 p-0.5"
        >
            <Icons
                name={icon}
                size="16"
                additionalClass="flex items-center text-neutral-900 group-hover/action:text-primary-blue"
            />
            <span className="flex text-xs text-neutral-900 group-hover/action:text-primary-blue">
                {title}
            </span>
        </Link>
    )
}

export default LinkAction
