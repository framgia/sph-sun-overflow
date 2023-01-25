type SidebarButtonProps = {
    IconName: string
    Text: string
    isSelected: boolean
    url: string
}

import Link from 'next/link'
import SidebarIcon from '@/components/atoms/SidebarIcon'

const SidebarButton = ({
  IconName,
  Text,
  isSelected,
  url,
}: SidebarButtonProps): any => {
  const isActive = (): string =>
    isSelected
      ? " bg-light-red text-primary-black border-r-4 border-r-primary-red hover:border-r-4 "
      : " text-secondary-black bg-light-gray border-r-4 border-r-secondary-gray";

  return (
    <li className="first:mt-2 -mr-1">
      <Link
        href={url}
        className={`flex p-2 text-2xl font-normal lg:pl-8 align-text-bottom
                   ${isActive()}
                   hover:text-primary-red hover:border-0 hover:rounded-none
                   active:text-black active:border-r-4 active:border-secondary-red active:rounded-lg
                   `}
      >
        <div className="flex w-full lg:w-fit justify-center">
          <SidebarIcon
            name={IconName}
            size={40}
          />
        </div>
        <span className="lg:pl-2 hidden  lg:flex  ">{Text}</span>
      </Link>
    </li>
  );
};

export default SidebarButton
