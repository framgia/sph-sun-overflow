import { CustomIcons } from '@/components/atoms/Icons'

const { UsersIcon } = CustomIcons

type TeamCardProps = {
    name: string
    description: string
    usersCount: number
}

const TeamCard = ({ name, description, usersCount }: TeamCardProps): JSX.Element => {
    return (
        <div className="flex h-[200px] flex-col rounded-[5px] border border-neutral-200 text-neutral-900">
            <div className="bg-primary-200 p-2 text-center text-base font-semibold">{name}</div>
            <div className="flex h-full flex-col items-center justify-between p-4">
                <p className="px-4 line-clamp-3">{description}</p>
                <div className="flex gap-1 text-neutral-disabled">
                    <div className="m-auto">
                        <UsersIcon />
                    </div>
                    <span>{usersCount}</span>
                </div>
            </div>
        </div>
    )
}

export default TeamCard
