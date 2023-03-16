import Link from 'next/link'
import SidebarIcon from '@/components/atoms/SidebarIcon'
import { Disclosure } from '@headlessui/react'
import { IoIosArrowDown } from 'react-icons/io'
import { useRouter } from 'next/router'

type SidebarButtonProps = {
    IconName: string
    Text: string
    url: string
    subMenu?: {
        IconName: string
        Text: string
        url: string
    }[]
}

const SidebarButton = ({ IconName, Text, subMenu, url }: SidebarButtonProps): any => {
    const router = useRouter()

    const isSelected = (index: number, urlString: string) => {
        const urlSplit = router.pathname.split('/')

        return urlString.includes(urlSplit[index])
    }

    const selectedClass = '-mr-1 bg-red-100 text-black border-r-4 border-r-primary-red'
    const notSelectedClass = '-mr-1'

    return (
        <li className="sidebar-list">
            {subMenu ? (
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button
                                className={`flex items-center space-x-2  p-2 pl-8 text-2xl font-normal `}
                            >
                                <SidebarIcon name={IconName} />
                                <span className="pl-2">{Text}</span>
                                <IoIosArrowDown
                                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 `}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="">
                                <ul className="ml-3">
                                    {subMenu.map((child, index) => {
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={`/${child.url}`}
                                                    className={`ml-6 flex items-center space-x-2 p-2 text-xl font-normal ${
                                                        isSelected(2, child.url)
                                                            ? selectedClass
                                                            : notSelectedClass
                                                    } hover:text-[#ff2000] active:border-r-4 active:border-red-400 active:text-black`}
                                                >
                                                    <SidebarIcon name={child.IconName} />
                                                    <span className="pl-2">{child.Text}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            ) : (
                <Link
                    href={url}
                    className={`flex items-center space-x-2 p-2  pl-8 text-2xl font-normal ${
                        isSelected(1, url) ? selectedClass : notSelectedClass
                    } hover:text-[#ff2000] active:border-r-4 active:border-red-400 active:text-black`}
                >
                    <SidebarIcon name={IconName} />
                    <span className="pl-2">{Text}</span>
                </Link>
            )}
        </li>
    )
}

export default SidebarButton
