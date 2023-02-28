import Link from 'next/link'
import SearchBar from '../../molecules/SearchBar'
import NotificationDropdown from '../../molecules/NotificationDropdown'
import UserDropdown, { UserProps } from '../../molecules/UserDropdown'
import { useBoundStore } from '@/helpers/store'
import GET_NOTIFICATIONS from '@/helpers/graphql/queries/get_notifications'
import { useLazyQuery } from '@apollo/client'
import { errorNotify } from '@/helpers/toast'
import { useEffect } from 'react'
import Image from 'next/image'

const Navbar = (): JSX.Element => {
    const user: UserProps = {
        id: useBoundStore.getState().user_id,
        first_name: useBoundStore.getState().first_name,
        last_name: useBoundStore.getState().last_name,
        avatar: useBoundStore.getState().avatar,
        slug: useBoundStore.getState().slug,
        updated_at: useBoundStore.getState().updated_at,
    }

    const [getNotifications, { data, loading, error }] = useLazyQuery(GET_NOTIFICATIONS)

    useEffect(() => {
        getNotifications({
            variables: {
                user_id: user.id,
            },
        })
    }, [user.id, useBoundStore.getState().updated_at])

    if (error) {
        errorNotify(error.toString())
    }

    return (
        <nav className="z-10 w-full bg-gray-100 px-9 py-2 drop-shadow-md">
            <div className="flex w-full flex-wrap items-center justify-between">
                <Link href="/questions" className="flex">
                    <div className="mr-4">
                        <Image src="/images/logo.png" alt="sun-logo" width={40} height={40} />
                    </div>
                    <span className="text-3xl font-bold tracking-tighter">
                        <span className="text-primary-red">Sun* </span>
                        <span className="text-primary-black">Overflow</span>
                    </span>
                </Link>
                <div className="flex items-center md:order-2">
                    <SearchBar />
                    {!loading && data && (
                        <NotificationDropdown notifications={data.userNotifications} />
                    )}
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
