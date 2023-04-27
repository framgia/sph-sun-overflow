type Props = {
    children: JSX.Element | JSX.Element[]
}

const UserActions = ({ children }: Props): JSX.Element => {
    return <div className="flex flex-row items-center gap-1 text-xs">{children}</div>
}

export default UserActions
