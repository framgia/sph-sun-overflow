import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { HiBell } from 'react-icons/hi'

const NotificationDropdown = () => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="mx-1 flex items-center rounded-full bg-gray-200 p-2 text-[#333333] hover:bg-red-200 hover:text-red-500 active:bg-red-200 active:text-red-500 sm:mx-3">
                    <HiBell size={24} />
                    <span className="sr-only">Notifications</span>
                    <div className="absolute -top-2 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-current bg-red-500 text-xs font-bold text-white">
                        1
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
                <Menu.Items className="absolute right-0 mt-1 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            <span className="block px-4 py-2 text-sm font-bold text-gray-900">
                                Notifications
                            </span>
                        </Menu.Item>
                    </div>
                    <div>
                        <Menu.Item>{renderNotifications()}</Menu.Item>
                    </div>
                    <div>
                        <Menu.Item>
                            <Link className="block px-4 py-2 text-sm text-gray-700" href="#">
                                View All
                            </Link>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const renderNotifications = () => {
    const [isRead, setIsRead] = useState(false)

    return (
        <Link
            href="#"
            className={`flex px-4 py-3 hover:bg-red-100 ${isRead ? '' : 'bg-red-200'}`}
            onClick={() => setIsRead(true)}
        >
            <div className="flex-shrink-0">
                <img
                    className="h-9 w-9 rounded-full"
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="user photo"
                />
            </div>
            <div className="w-full pl-3">
                <div className="mb-1.5 text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">John Smith </span>
                    followed you.
                </div>
                <div className="text-xs text-blue-600">a few moments ago</div>
            </div>
        </Link>
    )
}

export default NotificationDropdown
