import { CustomIcons } from '@/components/atoms/Icons'
import Link from 'next/link'

const { UsersIcon } = CustomIcons

type TeamCardProps = {
    slug: string
    name: string
    description: string
    usersCount: number
}

const TeamCard = ({ slug, name, description, usersCount }: TeamCardProps): JSX.Element => {
    return (
        <Link href={`/teams/${slug}`}>
            <div className="group flex h-[200px] flex-col rounded-[5px] border border-neutral-200 text-neutral-900">
                <div className="bg-primary-200 p-2 text-center text-sm font-semibold group-hover:text-primary-base">
                    {name}
                </div>
                <div className="flex h-full flex-col items-center justify-between p-4">
                    <p className="px-4 text-xs line-clamp-3">{description}</p>
                    <div className="flex gap-[2px] text-neutral-disabled">
                        <div>
                            <UsersIcon />
                        </div>
                        <span className="text-xs">{usersCount}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TeamCard
