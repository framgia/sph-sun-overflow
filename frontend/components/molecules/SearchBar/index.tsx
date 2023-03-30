import { useRouter } from 'next/router'
import { useState } from 'react'
import { HiSearch } from 'react-icons/hi'

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
        <div className="mt-[15px] mb-[13px] mr-[34px] flex h-[50px] w-[530px]">
            <div className="relative h-full w-full">
                <form onSubmit={handleSubmit} className="relative h-full w-full">
                    <input
                        type="text"
                        name="search"
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value)
                        }}
                        className="form-input h-full w-full rounded-full border border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500"
                        placeholder="Search..."
                        required
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center rounded-r-full"
                    >
                        <HiSearch className="mr-[19px] text-3xl text-primary-red" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar
