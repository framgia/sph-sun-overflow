import { CustomIcons } from '@/components/atoms/Icons'
import type { FilterType } from '@/components/templates/QuestionsPageLayout'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const { ChevronIcon } = CustomIcons

type AppProps = {
    grouped?: boolean
    selectedFilter: string
    icon?: React.ReactNode
    filters: FilterType[] | FilterType[][]
}

const SortDropdown = ({
    grouped = false,
    selectedFilter,
    icon,
    filters,
}: AppProps): JSX.Element => {
    const renderFilters = (): JSX.Element[] => {
        return filters.map((filter) => {
            const newFilter = filter as FilterType
            return (
                <div key={newFilter.id} className="cursor-pointer">
                    <Menu.Item>
                        {({ active }) => (
                            <div
                                className={`${
                                    active ? 'bg-primary-200' : 'bg-white-100'
                                } w-full break-all px-4 py-2 text-sm text-primary-black`}
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
                                            active ? 'bg-primary-200' : 'bg-white-100'
                                        } w-full break-all px-4 py-2 text-sm text-primary-black`}
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
                    <Menu.Button className="flex h-9 justify-end rounded-[5px] border border-neutral-500 p-2 text-sm text-neutral-900">
                        <span className="">{selectedFilter}</span>
                        {!icon ? (
                            <div className="m-auto">
                                <ChevronIcon />
                            </div>
                        ) : (
                            icon
                        )}
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
                    <Menu.Items className="absolute right-0 z-10 mt-1 max-h-80 w-36 divide-y divide-neutral-200 overflow-y-auto rounded-[5px] border border-neutral-200 bg-white shadow">
                        {grouped ? renderGroupedFilters() : renderFilters()}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default SortDropdown
