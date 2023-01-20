import Link from 'next/link';
import SearchBar from '../../molecules/SearchBar';
import NotificationDropdown from '../../molecules/NotificationDropdown';
import UserDropdown from '../../molecules/UserDropdown';

const Navbar = () => {
	return (
		<nav className="absolute z-10 w-full p-3 bg-gray-100 shadow">
			<div className="container flex flex-wrap items-center justify-between mx-auto">
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
	);
}

export default Navbar
