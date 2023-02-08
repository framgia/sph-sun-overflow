import Link from 'next/link'
import SearchBar from '../../molecules/SearchBar'
import NotificationDropdown from '../../molecules/NotificationDropdown'
import UserDropdown from '../../molecules/UserDropdown'

const Navbar = () => {
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
                    <NotificationDropdown />
                    <UserDropdown />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
