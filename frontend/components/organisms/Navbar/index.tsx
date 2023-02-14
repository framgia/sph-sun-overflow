import Link from 'next/link'
import SearchBar from '../../molecules/SearchBar'
import NotificationDropdown from '../../molecules/NotificationDropdown'
import UserDropdown, { UserProps } from '../../molecules/UserDropdown'
import { useBoundStore } from '@/helpers/store'
import GET_NOTIFICATIONS from '@/helpers/graphql/queries/get_notifications'
import { useQuery } from '@apollo/client'
import { loadingScreenShow } from '@/helpers/loaderSpinnerHelper'
import { getUserToken } from '@/helpers/localStorageHelper'
import { errorNotify } from '@/helpers/toast'

const Navbar = (): JSX.Element => {
    const user: UserProps = {
        id: useBoundStore.getState().user_id,
        first_name: useBoundStore.getState().first_name,
        last_name: useBoundStore.getState().last_name,
        avatar: useBoundStore.getState().avatar,
    }

    const { data, loading, error } = useQuery(GET_NOTIFICATIONS, {
        variables: {
            user_id: user.id,
        },
    })

    if (loading) {
        return loadingScreenShow()
    } else if (error) {
        errorNotify(error.toString())
    }

    return (
        <nav className="z-10 w-full bg-gray-100 px-1 py-2 drop-shadow-md md:px-20">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link href="/" className="flex">
                    <span className="text-3xl font-bold tracking-tighter">
                        <span className="text-primary-red">Sun* </span>
                        <span className="text-primary-black">Overflow</span>
                    </span>
                </Link>
                <div className="flex items-center md:order-2">
                    <SearchBar />
                    <NotificationDropdown notifications={data.userNotifications} />
                    <UserDropdown
                        id={user.id}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        avatar={user.avatar}
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
