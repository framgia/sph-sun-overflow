import { useRouter } from 'next/router'
import { HiSearch } from 'react-icons/hi'
import { useState } from 'react'

const SearchBar = (): JSX.Element => {
    const router = useRouter()
    const [searchKey, setSearchKey] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const target = e.target as typeof e.target & {
            search: { value: string }
        }

        await router.push({
            pathname: `/questions`,
            query: {
                search: target.search.value,
            },
        })
        setSearchKey('')
    }

    return (
        <div className="my-1 flex sm:mx-3">
            <div className="relative w-48 lg:w-80">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="search"
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                        }}
                        className="form-input h-9 w-48 rounded-full border border-gray-300 px-4 text-gray-900 focus:border-red-500 focus:ring-red-500
                        lg:w-80"
                        placeholder="Search..."
                        required
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center rounded-r-full pl-1 pr-2"
                    >
                        <HiSearch size={20} className="mr-1 text-gray-400" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar
