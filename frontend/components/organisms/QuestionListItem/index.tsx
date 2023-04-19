import Privacy from '@/components/molecules/Privacy'
import Tags from '@/components/molecules/Tags'
import Link from 'next/link'
import React from 'react'

type Props = {
    id: number
    privacy: 'Public' | 'Private'
}

const QuestionListItem: React.FC<Props> = ({ id, privacy }) => {
    return (
        <div className="border-b-2 border-y-neutral-200 p-2 text-neutral-900">
            <div className="flex  w-full items-start gap-4 ">
                <div className="flex min-w-fit flex-col items-end pt-1 text-xs font-light">
                    <span>10 Votes</span>
                    <span>5 Answers</span>
                    <span>29 Views</span>
                </div>
                <div className="flex h-32 w-full flex-col gap-2">
                    <span className="text-base font-semibold">Question Title</span>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur. Viverra mauris at dui platea ut
                        velit at in. Volutpat tristique varius aliquet faucibus mauris pellentesque
                        cursus.
                    </p>
                    <Tags
                        values={[
                            {
                                id: 1,
                                slug: 'javascript',
                                name: 'JavaScript',
                                description: 'JavaScript questions',
                                is_watched_by_user: true,
                            },
                            {
                                id: 2,
                                slug: 'typeScript',
                                name: 'TypeScript',
                                description: 'TypeScript questions',
                                is_watched_by_user: false,
                            },
                        ]}
                    />
                </div>
                <div className="flex w-[5.5rem] justify-end">
                    <Privacy
                        name={privacy}
                        iconPath={`${privacy === 'Public' ? '/svg/Unlock.svg' : '/svg/Lock.svg'}`}
                        additionalClass={`${privacy === 'Public' ? 'text-neutral-disabled' : ''}`}
                    />
                </div>
            </div>
            <div className="flex justify-end text-xs">
                <span>
                    <Link href="#" className="text-primary-blue">
                        John Doe
                    </Link>{' '}
                    asked 2hrs ago
                </span>
            </div>
        </div>
    )
}

export default QuestionListItem
