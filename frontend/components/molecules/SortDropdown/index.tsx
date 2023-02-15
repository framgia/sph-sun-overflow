import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Icons from '@/components/atoms/Icons'
import { FilterType } from '../../../pages/questions/index'

type AppProps = {
    selectedFilter: string
    filters: FilterType[]
}

const SortDropdown = ({ selectedFilter, filters }: AppProps) => {
    return (
        <div className="flex items-center">
            <Menu as="div" className="relative inline-block w-full text-left">
                <div>
                    <Menu.Button className="flex w-full items-center justify-between bg-gray-200 p-2 text-sm text-primary-black">
                        <span className="pl-2 ">{selectedFilter}</span>
                        <div className="items-end">
                            <Icons name={'dropdown'} />
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
                    <Menu.Items className="absolute right-0 w-44 origin-top divide-y divide-gray-100 border bg-white drop-shadow-lg">
                        {filters.map((filter) => {
                            return (
                                <div key={filter.id} className="cursor-pointer">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                className={`${
                                                    active ? 'bg-light-gray' : ''
                                                } w-full py-2 px-4 text-sm text-gray-900`}
                                                onClick={filter.onClick}
                                            >
                                                {filter.name}
                                            </div>
                                        )}
                                    </Menu.Item>
                                </div>
                            )
                        })}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default SortDropdown
