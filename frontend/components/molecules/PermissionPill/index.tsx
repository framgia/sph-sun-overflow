type Props = {
    children: string | JSX.Element
}

const PermissionPill = ({ children }: Props): JSX.Element => {
    return (
        <div className="flex w-fit min-w-fit flex-row items-center gap-1 rounded-full bg-primary-red py-1 px-3 text-xs font-normal text-white !outline-none">
            <span>{children}</span>
        </div>
    )
}

export default PermissionPill
