type Props = {
    header?: JSX.Element | string
    children: JSX.Element | string
    footer?: JSX.Element | string
}

const Card = ({ header, children, footer }: Props): JSX.Element => {
    return (
        <div className="flex h-52 w-full flex-col justify-between rounded-xl border border-border-black bg-white px-5">
            <div className="w-full">
                <div className="flex w-full flex-row py-3 text-lg font-bold">{header}</div>
                <div className="max-h-[105px] w-full overflow-auto">{children}</div>
            </div>
            <div className="flex w-full flex-row py-3 text-secondary-text">{footer}</div>
        </div>
    )
}

export default Card
