import type { FilterType } from '@/components/templates/QuestionsPageLayout'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiChevronDown } from 'react-icons/hi'

type AppProps = {
    grouped?: boolean
    selectedFilter: string
    filters: FilterType[] | FilterType[][]
}

const SortDropdown = ({ grouped = false, selectedFilter, filters }: AppProps): JSX.Element => {
    const renderFilters = (): JSX.Element[] => {
        return filters.map((filter) => {
            const newFilter = filter as FilterType
            return (
                <div key={newFilter.id} className="cursor-pointer">
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                className={`${
                                    active ? 'bg-light-red' : 'bg-white-100'
                                } w-full py-2 px-4 text-sm text-primary-black`}
                                onClick={newFilter.onClick}
                            >
                                {newFilter.name}
                            </div>
                        )}
                    </Menu.Item>
                </div>
            )
        })
    }

    const renderGroupedFilters = (): JSX.Element[] => {
        return filters.map((filter, index) => {
            const newFilters = filter as FilterType[]
            return (
                <div key={index} className="cursor-pointer">
                    {newFilters.map((newFilter) => {
                        return (
                            <Menu.Item key={newFilter.id}>
                                {({ active }) => (
                                    <div
                                        className={`${
                                            active ? 'bg-light-red' : 'bg-white-100'
                                        } w-full py-2 px-4 text-sm text-primary-black`}
                                        onClick={newFilter.onClick}
                                    >
                                        {newFilter.name}
                                    </div>
                                )}
                            </Menu.Item>
                        )
                    })}
                </div>
            )
        })
    }

    return (
        <div className="flex items-center">
            <Menu as="div" className="relative inline-block w-full text-left">
                <div>
                    <Menu.Button className="inline-flex items-center justify-center rounded-md bg-primary-red p-2 text-center text-sm text-white hover:bg-dark-red focus:outline-none focus:ring-1 focus:ring-red-700">
                        <span className="px-2">{selectedFilter}</span>
                        <div className="items-end items-center">
                            <HiChevronDown className="text-red text-lg" />
                        </div>
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 z-10 mt-1 w-44 divide-y divide-gray-200 rounded-lg bg-white bg-white shadow">
                        {grouped ? renderGroupedFilters() : renderFilters()}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default SortDropdown
