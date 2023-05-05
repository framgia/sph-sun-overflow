interface StatsProps {
    label: string
    value: number
}

const PageStats = ({ label, value }: StatsProps): JSX.Element => {
    return (
        <div className="flex flex-row gap-2 text-sm">
            <span className="font-medium">{label}:</span> {value}
        </div>
    )
}
export default PageStats
