import { HiSearch } from 'react-icons/hi'

const SearchBar = () => {
    return (
        <div className="my-1 flex sm:mx-3">
            <form method="GET" action="/questions">
                <div className="relative w-48 lg:w-80">
                    <input
                        type="text"
                        name="search"
                        className="form-input h-9 w-48 rounded-full border border-gray-300 px-4 text-gray-900 focus:border-red-500 focus:ring-red-500 lg:w-80"
                        placeholder="Search..."
                        required
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 mr-2 flex items-center"
                    >
                        <HiSearch size={20} className="mr-1 text-gray-400" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
