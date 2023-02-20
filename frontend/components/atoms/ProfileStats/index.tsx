interface ProfileStatsProps {
    value: number
    text: string
}

const ProfileStats = ({ value, text }: ProfileStatsProps) => {
    return (
        <div className="p-2">
            <div className="text-md text-center font-bold">{value}</div>
            <div className="text-sm">{text}</div>
        </div>
    )
}
export default ProfileStats
