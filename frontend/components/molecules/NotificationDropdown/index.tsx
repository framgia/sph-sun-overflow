import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiBell } from 'react-icons/hi'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { parseHTML } from '@/helpers/htmlParsing'
import UPDATE_NOTIFICATION from '@/helpers/graphql/mutations/update_notification'

type User = {
    id: number
    first_name: string
    last_name: string
    avatar: string
    __typename: string
}

type Morphable = {
    id: number
    content: string | null
    title: string | null
    slug: string | null
    question: null | {
        id: number
        slug: string
    }
    __typename: string
}

type Question = {
    id: number
    slug: string
    title: string
    user: User
    __typename: string
}

type Answer = {
    id: number
    content: string
    is_correct: boolean
    user: User
    question: Question
    __typename: string
}

type Comment = {
    id: number
    user: User
    commentable: Morphable
    __typename: string
}

type Vote = {
    id: number
    user: User
    voteable: Morphable
    __typename: string
}

export type NotificationProps = {
    id: number
    is_read: boolean
    humanized_created_at: string
    notifiable: Answer | Comment | Vote
    __typename: string
}

export type Notifications = {
    notifications: NotificationProps[]
}

const NotificationDropdown = ({ notifications }: Notifications): JSX.Element => {
    const unread: NotificationProps[] = notifications.filter(
        (notification: NotificationProps) => notification.is_read != true
    )

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="mx-1 flex items-center rounded-full bg-gray-200 p-2 text-primary-black hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500 sm:mx-3">
                    <HiBell size={24} />
                    <span className="sr-only">Notifications</span>
                    <div
                        className={
                            unread?.length > 0
                                ? `absolute -top-2 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-current bg-red-500 text-xs font-bold text-white`
                                : `hidden`
                        }
                    >
                        {unread?.length}
                    </div>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-1 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <span className="block px-4 py-2 text-sm font-bold text-gray-900">
                                Notifications
                            </span>
                        </Menu.Item>
                    </div>
                    {notifications.length > 0 && (
                        <div className="max-h-80 overflow-y-auto">
                            {renderNotifications(notifications)}
                        </div>
                    )}
                    {notifications.length == 0 && (
                        <div>
                            <span className="block p-4 text-center text-sm text-gray-700">
                                No new notifications
                            </span>
                        </div>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const renderNotifications = (notifications: NotificationProps[]) => {
    const router = useRouter()
    const [updateUserNotification] = useMutation(UPDATE_NOTIFICATION)

    return notifications.map((n: NotificationProps) => (
        <Menu.Item as="div" key={n.id}>
            <Link
                href="/"
                className={`flex px-4 py-3 hover:bg-red-100 ${n.is_read ? '' : 'bg-red-200'}`}
                onClick={(e) => {
                    e.preventDefault()
                    if (!n.is_read) {
                        updateUserNotification({
                            variables: {
                                id: n.id,
                                is_read: true,
                            },
                        })
                            .then(() => {
                                router.push(setLink(n.notifiable))
                            })
                            .catch((error: any) => {
                                throw error
                            })
                    } else {
                        router.push(setLink(n.notifiable))
                    }
                }}
            >
                <div className="flex-shrink-0">
                    <img
                        className="h-9 w-9 rounded-full"
                        src={n.notifiable.user.avatar}
                        alt="user photo"
                    />
                </div>
                <div className="w-full pl-3">
                    <div className="mb-1 text-sm text-gray-600 line-clamp-3">
                        <span className="font-semibold text-gray-900">{setName(n.notifiable)}</span>
                        {setDetails(n.notifiable)}
                    </div>
                    <div className="text-xs text-gray-500">{n.humanized_created_at}</div>
                </div>
            </Link>
        </Menu.Item>
    ))
}

const setLink = (notifiable: any): string => {
    let link = ''
    switch (notifiable.__typename) {
        case 'Answer':
            link = `/questions/${notifiable.question.slug}`
            break
        case 'Comment':
            link = `/questions/${
                notifiable.commentable.slug ?? notifiable.commentable.question.slug
            }`
            break
        case 'Vote':
            link = `/questions/${notifiable.voteable.slug ?? notifiable.voteable.question.slug}`
            break
    }
    return link
}

const setName = (notifiable: any): string => {
    let name = `${notifiable.user.first_name} ${notifiable.user.last_name} `
    if (notifiable.__typename == 'Answer' && notifiable.is_correct) {
        name = `${notifiable.question.user.first_name} ${notifiable.question.user.last_name} `
    }
    return name
}

const setDetails = (notifiable: any): string => {
    let details = ''
    switch (notifiable.__typename) {
        case 'Answer':
            if (notifiable.is_correct) {
                details = `accepted your answer to their question: "${notifiable.question.title}".`
            } else {
                details = `posted an answer to your question: "${notifiable.question.title}".`
            }
            break
        case 'Comment':
            let commentContent: any = parseHTML(notifiable.commentable.content)
            details = `commented on your ${notifiable.commentable.__typename}: "${
                notifiable.commentable.title ?? commentContent.props.children
            }".`
            break
        case 'Vote':
            let voteContent: any = parseHTML(notifiable.voteable.content)
            details = `voted on your ${notifiable.voteable.__typename}: "${
                notifiable.voteable.title ?? voteContent.props.children
            }".`
            break
    }
    return details
}

export default NotificationDropdown
