interface ProfileStatsProps {
    value: number
    text: string
}

const ProfileStats = ({ value, text }: ProfileStatsProps): JSX.Element => {
    return (
        <div className="flex flex-col">
            <div className="text-md text-center font-bold">{value}</div>
            <div className="text-sm">{text}</div>
        </div>
    )
}
export default ProfileStats
