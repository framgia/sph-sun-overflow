import { HiSearch } from "react-icons/hi";

const SearchBar = () => {
	return (
			<form method="GET">
				<div className="relative w-48 md:w-80">
					<input
						type="text"
						name="search"
						className="form-input px-4 w-48 md:w-80 text-gray-900 border border-gray-300 rounded-full focus:ring-red-500 focus:border-red-500"
						placeholder="Search..."
						required
					/>
					<button
						type="submit"
						className="absolute inset-y-0 right-0 flex items-center mr-2">
						<HiSearch size={20} className="mr-1 text-gray-400"/>
					</button>
				</div>
			</form>
	);
}

export default SearchBar;
