import GET_NOTIFICATIONS from '@/helpers/graphql/queries/get_notifications'
import { getUserToken } from '@/helpers/localStorageHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify } from '@/helpers/toast'
import { useLazyQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import NotificationDropdown from '../../molecules/NotificationDropdown'
import type { UserProps } from '../../molecules/UserDropdown'
import UserDropdown from '../../molecules/UserDropdown'

const Navbar = (): JSX.Element => {
    const [pushNotifs, setPushNotifs] = useState(false)

    const user: UserProps = {
        id: useBoundStore.getState().user_id,
        first_name: useBoundStore.getState().first_name,
        last_name: useBoundStore.getState().last_name,
        avatar: useBoundStore.getState().avatar,
        slug: useBoundStore.getState().slug,
        updated_at: useBoundStore.getState().updated_at,
    }

    const [getNotifications, { data, error }] = useLazyQuery(GET_NOTIFICATIONS, {
        fetchPolicy: 'network-only',
    })

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '', {
        // encrypted: true,
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER ?? '',
        authEndpoint: process.env.NEXT_PUBLIC_PUSHER_APP_AUTH_ENDPOINT,
        auth: {
            headers: {
                Authorization: 'Bearer ' + getUserToken(),
            },
        },
    })

    const channel = pusher.subscribe(`private-notification-send-${user.id}`)

    channel.bind('new-notification-send', function (data: any) {
        setPushNotifs(!pushNotifs)
    })

    useEffect(() => {
        void getNotifications({
            variables: {
                user_id: user.id,
            },
        })
    }, [user.id, useBoundStore.getState().updated_at, pushNotifs, getNotifications])

    if (error) {
        errorNotify(error.message)
    }

    return (
        <nav className="h-full w-full border-b border-neutral-200 bg-white drop-shadow-xsm">
            <div className="flex h-full w-full flex-row items-center justify-between px-8">
                <Link
                    href="/questions"
                    className="group relative flex flex-row items-center justify-center gap-px"
                >
                    <div className="z-10 flex h-11 w-11 items-center justify-center">
                        <Image
                            height="100"
                            width="100"
                            alt="Sun Bear Logo"
                            src="/images/sun_logo.png"
                            className="h-10 w-10 transition-all duration-200 group-hover:h-11 group-hover:w-11"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col">
                        <span className="absolute -top-[23px] text-2xl font-semibold text-primary-red transition-all duration-200 group-hover:text-white">
                            Sun
                        </span>
                        <span className="absolute -bottom-[23px] font-semibold text-neutral-900">
                            Overflow
                        </span>
                    </div>
                    <div className="from-30% fixed left-14 h-10 w-0 bg-gradient-to-r from-primary-500 to-transparent transition-all duration-300 group-hover:h-11 group-hover:w-28"></div>
                </Link>
                <div className="flex items-center gap-2 md:order-2">
                    {data && <NotificationDropdown notifications={data.userNotifications} />}
                    <UserDropdown
                        id={user.id}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        avatar={user.avatar}
                        slug={user.slug}
                        updated_at={user.updated_at}
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
