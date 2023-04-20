type Props = {
    children: string | JSX.Element
}

const PermissionPill = ({ children }: Props): JSX.Element => {
    return (
        <div className="flex w-fit min-w-fit flex-row justify-center rounded-full bg-red-300 py-1.5 px-3 text-xs font-normal text-white !outline-none lg:w-28">
            <span>{children}</span>
        </div>
    )
}

export default PermissionPill
