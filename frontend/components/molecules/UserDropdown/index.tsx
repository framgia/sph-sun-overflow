import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'
import { setUserToken } from '@/helpers/localStorageHelper'
import { signOut } from 'next-auth/react'

const UserDropdown = () => {
    return (
        <Menu as="div" className="relative ml-1 inline-block text-left">
            <div>
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm active:ring-2 active:ring-red-500 sm:mx-3 md:mr-0">
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-[40px] w-[40px] rounded-full"
                        src="https://www.w3schools.com/howto/img_avatar.png"
                        alt="user photo"
                    />
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 ">
                        <Menu.Item>
                            <span className="block px-4 py-2 text-sm font-bold text-gray-900">
                                John Doe
                            </span>
                        </Menu.Item>
                    </div>
                    <div>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    className={`block flex items-center px-4 py-2 text-sm text-gray-700  ${
                                        active && 'bg-red-100'
                                    }`}
                                    href="#"
                                >
                                    <HiOutlineUser className="mr-2" />
                                    Profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => {
                                        setUserToken('')
                                        signOut()
                                    }}
                                    className={`block flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 ${
                                        active && 'bg-red-100'
                                    }`}
                                >
                                    <HiOutlineLogout className="mr-2" />
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default UserDropdown
