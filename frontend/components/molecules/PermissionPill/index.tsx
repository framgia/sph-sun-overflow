type Props = {
    children: string | JSX.Element
}

const PermissionPill = ({ children }: Props): JSX.Element => {
    return (
        <div className="flex min-w-fit flex-row items-center gap-1 rounded-full bg-red-300 py-1 px-3 text-xs font-normal !outline-none">
            <span>{children}</span>
        </div>
    )
}

export default PermissionPill
