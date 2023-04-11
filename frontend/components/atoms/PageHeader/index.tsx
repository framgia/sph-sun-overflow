type Props = {
    children: JSX.Element | string
}

const PageHeader = ({ children }: Props): JSX.Element => {
    return <div className="w-full text-3xl font-bold text-gray-800">{children}</div>
}

export default PageHeader
