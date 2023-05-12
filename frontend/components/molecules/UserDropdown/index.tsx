import { CustomIcons } from '@/components/atoms/Icons'
import UpdatePasswordModal from '@/components/organisms/UpdatePasswordModal'
import { setUserToken } from '@/helpers/localStorageHelper'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import Avatar from 'react-avatar'
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi'

const { ChangePassIcon } = CustomIcons

export type UserProps = {
    id: number
    first_name: string
    last_name: string
    avatar: string
    slug: string
    google_id: string
    updated_at: string
}

const UserDropdown = ({
    id,
    first_name,
    last_name,
    avatar,
    slug,
    google_id,
    updated_at,
}: UserProps): JSX.Element => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex rounded-full text-sm hover:text-primary-red active:text-primary-red">
                        <span className="sr-only">Open user menu</span>
                        <Avatar
                            round={true}
                            name={`${first_name} ${last_name}`}
                            size="36"
                            alt={first_name}
                            maxInitials={1}
                            textSizeRatio={2}
                            src={
                                updated_at && updated_at.length > 0
                                    ? `${avatar}?${updated_at}`
                                    : `${avatar}`
                            }
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
                        <div className="py-3">
                            <Menu.Item>
                                <span
                                    className="px-4 text-sm font-bold text-gray-900 line-clamp-1"
                                    title={`${first_name} ${last_name}`}
                                >
                                    {`${first_name} ${last_name}`}
                                </span>
                            </Menu.Item>
                        </div>
                        <div>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        className={`flex items-center px-4 py-2 text-sm text-neutral-900  ${
                                            active ? 'bg-primary-100' : ''
                                        }`}
                                        href={`/users/${slug}`}
                                    >
                                        <div className="mr-2">
                                            <HiOutlineUser />
                                        </div>
                                        Profile
                                    </Link>
                                )}
                            </Menu.Item>
                            {!google_id && (
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={`flex cursor-pointer items-center px-4 py-2 text-sm text-neutral-900 ${
                                                active ? 'bg-primary-100' : ''
                                            }`}
                                            onClick={() => {
                                                setShowModal(true)
                                            }}
                                        >
                                            <div className="mr-2">
                                                <ChangePassIcon />
                                            </div>
                                            Change Password
                                        </div>
                                    )}
                                </Menu.Item>
                            )}
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setUserToken('')
                                            void signOut()
                                        }}
                                        className={`flex w-full items-center px-4 py-2 text-sm text-neutral-900 ${
                                            active ? 'bg-primary-100' : ''
                                        }`}
                                    >
                                        <div className="mr-2">
                                            <HiOutlineLogout />
                                        </div>
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
            <UpdatePasswordModal
                isOpen={showModal}
                closeModal={() => {
                    setShowModal(false)
                }}
            />
        </>
    )
}

export default UserDropdown
