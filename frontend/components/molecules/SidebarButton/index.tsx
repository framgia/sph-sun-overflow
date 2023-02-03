type SidebarButtonProps = {
    IconName: string
    Text: string
    isSelected: boolean
    url: string
}

import Link from 'next/link'
import SidebarIcon from '@/components/atoms/SidebarIcon'

const SidebarButton = ({ IconName, Text, isSelected, url }: SidebarButtonProps): any => {
    const isActive = (): string =>
        isSelected
            ? ' bg-red-100 text-black border-r-4 border-r-[#FF2000] '
            : ' text-gray-600 bg-white-700'

    return (
        <li className="-mr-1 first:mt-2">
            <Link
                href={url}
                className={`flex items-center space-x-2 p-2 pl-8 text-2xl font-normal
                   ${isActive()}
                   hover:rounded-none hover:border-0 hover:text-[#ff2000]
                   active:rounded-lg active:border-r-4 active:border-red-400 active:text-black
                   `}
            >
                <SidebarIcon name={IconName} />
                <span className="pl-2">{Text}</span>
            </Link>
        </li>
    )
}

export default SidebarButton
