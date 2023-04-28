import UPDATE_NOTIFICATION from '@/helpers/graphql/mutations/update_notification'
import { parseHTML } from '@/helpers/htmlParsing'
import { useMutation } from '@apollo/client'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import Avatar from 'react-avatar'
import { TbBell } from 'react-icons/tb'

type User = {
    id: number
    first_name: string
    last_name: string
    avatar: string
    slug?: string
    __typename: string
}

type UserRelation = {
    id: number
    following: User
    follower: User
}

type Morphable = {
    id: number
    content?: string
    title?: string
    slug?: string
    question?: {
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
    notifiable: Answer | Comment | Vote | UserRelation
    __typename: string
}

export type Notifications = {
    notifications: NotificationProps[]
}

const NotificationDropdown = ({ notifications }: Notifications): JSX.Element => {
    const unread: NotificationProps[] = notifications.filter(
        (notification: NotificationProps) => !notification.is_read
    )

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary-150 text-neutral-900 hover:bg-primary-200 active:bg-primary-200">
                    <TbBell className="h-6 w-6" />
                    <span className="sr-only">Notifications</span>
                    {unread.length > 0 && (
                        <div className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary-red p-0.5 text-xs font-semibold text-white">
                            {unread.length}
                        </div>
                    )}
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
                            {RenderNotifications(notifications)}
                        </div>
                    )}
                    {notifications.length === 0 && (
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

const RenderNotifications = (notifications: NotificationProps[]): JSX.Element[] => {
    const router = useRouter()
    const [updateUserNotification] = useMutation(UPDATE_NOTIFICATION)

    return notifications.map((n: NotificationProps) => (
        <Menu.Item as="div" key={n.id}>
            <Link
                href="/"
                className={`flex px-4 py-3 hover:bg-primary-100 ${
                    n.is_read ? '' : 'bg-primary-200'
                }`}
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
                                void router.push(setLink(n.notifiable))
                            })
                            .catch((error: any) => {
                                throw error
                            })
                    } else {
                        void router.push(setLink(n.notifiable))
                    }
                }}
            >
                <div className="flex-shrink-0">{setAvatar(n.notifiable)}</div>
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

const setAvatar = (notifiable: any): JSX.Element => {
    let avatar = ''

    if (notifiable.__typename === 'UserRelation') {
        avatar = notifiable.follower.avatar
    } else {
        avatar = notifiable.user.avatar
    }

    return (
        <Avatar
            round={true}
            name={setName(notifiable)}
            size="40"
            alt={setName(notifiable)}
            src={avatar}
            maxInitials={1}
            textSizeRatio={2}
        />
    )
}

const setLink = (notifiable: any): string => {
    let link = ''
    switch (notifiable.__typename) {
        case 'Answer':
            link = `/questions/${notifiable.question.slug as string}`
            break
        case 'Comment':
            link = `/questions/${
                (notifiable.commentable.slug as string) ??
                (notifiable.commentable.question.slug as string)
            }`
            break
        case 'Vote':
            link = `/questions/${
                (notifiable.voteable.slug as string) ??
                (notifiable.voteable.question.slug as string)
            }`
            break
        case 'UserRelation':
            link = `/users/${notifiable.follower.slug as string}`
            break
    }
    return link
}

const setName = (notifiable: any): string => {
    let name = ''
    if (notifiable.__typename === 'Answer' && notifiable.is_correct) {
        name = `${notifiable.question.user.first_name as string} ${
            notifiable.question.user.last_name as string
        } `
    } else if (notifiable.__typename === 'UserRelation') {
        name = `${notifiable.follower.first_name as string} ${
            notifiable.follower.last_name as string
        } `
    } else {
        name = `${notifiable.user.first_name as string} ${notifiable.user.last_name as string} `
    }
    return name
}

const setDetails = (notifiable: any): string => {
    let details = ''
    let commentContent: any
    let voteContent: any
    switch (notifiable.__typename) {
        case 'Answer':
            if (notifiable.is_correct) {
                details = `accepted your answer to their question: "${
                    notifiable.question.title as string
                }".`
            } else {
                details = `posted an answer to your question: "${
                    notifiable.question.title as string
                }".`
            }
            break
        case 'Comment':
            commentContent = parseHTML(notifiable.commentable.content)
            details = `commented on your ${notifiable.commentable.__typename as string}: "${
                (notifiable.commentable.title as string) ?? commentContent.props.children
            }".`
            break
        case 'Vote':
            voteContent = parseHTML(notifiable.voteable.content)
            details = `voted on your ${notifiable.voteable.__typename as string}: "${
                (notifiable.voteable.title as string) ?? voteContent.props?.children
            }".`
            break
        case 'UserRelation':
            details = 'followed you.'
            break
        default:
            details = ''
    }
    return details
}

export default NotificationDropdown
