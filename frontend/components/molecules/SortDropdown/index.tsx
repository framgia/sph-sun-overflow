import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Icons from '@/components/atoms/Icons'

const SortDropdown = () => {
    const filters: string[] = ['Highest Score', 'Date Posted']

    return (
        <div className="flex w-full flex-row items-center justify-end gap-2">
            <span className="text-sm">Sorted by: </span>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex w-44 items-center justify-between bg-gray-200 p-2 text-sm text-primary-black">
                        <span className="pl-2 ">{filters[0]}</span>
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
                                <div className="py-2 px-4">
                                    <Menu.Item>
                                        <Link href="#">
                                            <span className="text-sm text-gray-900">{filter}</span>
                                        </Link>
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
