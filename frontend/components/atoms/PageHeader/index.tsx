type Props = {
    children: JSX.Element | string
}

const PageHeader = ({ children }: Props): JSX.Element => {
    return <div className="w-full px-5 text-3xl font-bold">{children}</div>
}

export default PageHeader
