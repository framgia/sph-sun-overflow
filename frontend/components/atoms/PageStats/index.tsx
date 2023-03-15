interface StatsProps {
    label: string
    value: number
}

const PageStats = ({ label, value }: StatsProps) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-center text-lg">{label}</div>
            <div className="text-md">{value}</div>
        </div>
    )
}
export default PageStats
