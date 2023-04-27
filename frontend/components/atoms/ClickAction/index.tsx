import Icons from '../Icons'

type Props = {
    onClick: () => void
    icon: string
    title: string
}
const ClickAction = ({ onClick, icon, title }: Props): JSX.Element => {
    return (
        <div
            onClick={onClick}
            className="group/action flex cursor-pointer flex-row items-center gap-0.5 p-0.5"
        >
            <Icons
                name={icon}
                size="16"
                additionalClass="flex items-center text-neutral-900 group-hover/action:text-primary-blue"
            />
            <span className="flex text-xs text-neutral-900 group-hover/action:text-primary-blue">
                {title}
            </span>
        </div>
    )
}

export default ClickAction
