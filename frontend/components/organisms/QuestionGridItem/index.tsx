import { CustomIcons } from '@/components/atoms/Icons'
import Tags from '@/components/molecules/Tags'
import Link from 'next/link'

const { UnlockIcon, ThumbUpIcon } = CustomIcons

const QuestionGridItem = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-4 rounded-[5px] border border-neutral-200 p-2 text-neutral-900">
            <div className="flex justify-between">
                <span className="text-base font-semibold">Title Content</span>
                <div className="flex items-center">
                    <UnlockIcon />
                </div>
            </div>
            <div className="flex gap-3">
                <div className="flex flex-col gap-2">
                    <p className="text-sm line-clamp-3">
                        Lorem ipsum dolor sit amet consectetur. Sed amet at id sit proin in. Lorem
                        ipsum dolor sit amet consectetur. Sed amet at id sit proin in. Lorem ipsum
                        dolor sit amet consectetur. Sed amet at id sit proin in. Lorem ipsum dolor
                        sit amet consectetur. Sed amet at id sit proin in. Lorem ipsum dolor sit
                        amet consectetur. Sed amet at id sit proin in.
                    </p>
                    <div className="flex w-fit gap-1 rounded-[4px] border border-primary-base px-1 py-[2px] text-primary-base">
                        <div>
                            <ThumbUpIcon />
                        </div>
                        <span className="text-xs font-bold">87%</span>
                    </div>
                </div>
                <div className="flex min-w-fit flex-col items-end pt-1 text-xs font-light">
                    <span>10 Votes</span>
                    <span>5 Answers</span>
                    <span>29 Views</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
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
                        {
                            id: 3,
                            slug: 'javascript',
                            name: 'JavaScript',
                            description: 'JavaScript questions',
                            is_watched_by_user: true,
                        },
                        {
                            id: 4,
                            slug: 'typeScript',
                            name: 'TypeScript',
                            description: 'TypeScript questions',
                            is_watched_by_user: false,
                        },
                        {
                            id: 5,
                            slug: 'javascript',
                            name: 'JavaScript',
                            description: 'JavaScript questions',
                            is_watched_by_user: true,
                        },
                        {
                            id: 6,
                            slug: 'typeScript',
                            name: 'TypeScript',
                            description: 'TypeScript questions',
                            is_watched_by_user: false,
                        },
                    ]}
                />
                <div className="flex justify-between text-xs">
                    <span>
                        Author:{' '}
                        <Link href="#" className="text-primary-blue">
                            John Doe
                        </Link>
                    </span>
                    <time>2022-12-02</time>
                </div>
            </div>
        </div>
    )
}

export default QuestionGridItem
