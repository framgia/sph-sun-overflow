import GET_NOTIFICATIONS from '@/helpers/graphql/queries/get_notifications'
import { getUserToken } from '@/helpers/localStorageHelper'
import { useBoundStore } from '@/helpers/store'
import { errorNotify } from '@/helpers/toast'
import { useLazyQuery } from '@apollo/client'
import Link from 'next/link'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import NotificationDropdown from '../../molecules/NotificationDropdown'
import SearchBar from '../../molecules/SearchBar'
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
        <nav className="z-10 h-[80px] w-full bg-white drop-shadow-md">
            <div className="flex h-full w-full flex-wrap items-center justify-between">
                <Link href="/questions" className="flex h-full items-center justify-center">
                    <div className="ml-[60px] text-[32px] font-bold leading-[38px] tracking-tighter">
                        <span className="text-primary-red">Sun* </span>
                        <span className="text-primary-black">Overflow</span>
                    </div>
                </Link>
                <div className="flex items-center md:order-2">
                    <SearchBar />
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
