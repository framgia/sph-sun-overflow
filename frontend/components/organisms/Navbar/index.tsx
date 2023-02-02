import Link from 'next/link'
import SearchBar from '../../molecules/SearchBar'
import NotificationDropdown from '../../molecules/NotificationDropdown'
import UserDropdown from '../../molecules/UserDropdown'

const Navbar = () => {
    return (
        <nav className="w-full bg-gray-100 p-3">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link href="/" className="flex">
                    <span className="text-3xl font-bold tracking-tighter">
                        <text className="text-[#FF2000]">Sun* </text>
                        <text className="text-[#333333]">Overflow</text>
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
