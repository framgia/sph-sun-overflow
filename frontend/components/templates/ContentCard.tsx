type Props = {
    header: string | JSX.Element
    children: JSX.Element
}

const ContentCard = ({ header, children }: Props): JSX.Element => {
    return (
        <div className="flex w-full flex-col rounded-smd border border-neutral-200 bg-neutral-white drop-shadow-xsm">
            <div className="flex h-13 items-center bg-primary-200 p-4 font-semibold text-neutral-900">
                {header}
            </div>
            {children}
        </div>
    )
}

export default ContentCard
