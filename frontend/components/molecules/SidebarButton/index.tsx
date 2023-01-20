type SidebarButtonProps = {
  IconName: string;
  Text: string;
  isSelected: boolean;
  url: string;
};

import {
  BookmarkIcon,
  QuestionsIcon,
  RolesIcon,
  TagsIcon,
  TeamsIcon,
  UsersIcon,
} from "../../public/icons";

import {
  HiBookmark,
  HiHome,
  HiCode,
  HiUsers,
  HiOutlineUser,
  HiUserGroup,
} from "react-icons/hi";

import Link from "next/link";

const SidebarButton = ({
  IconName,
  Text,
  isSelected,
  url,
}: SidebarButtonProps): any => {
  const getIcon = (): JSX.Element => {
    if (IconName === "Bookmark") {
      return <HiBookmark />;
    }
    if (IconName === "Questions") {
      return <HiHome />;
    }
    if (IconName === "Roles") {
      return <HiOutlineUser />;
    }
    if (IconName == "Tags") {
      return <HiCode />;
    }
    if (IconName === "Teams") {
      return <HiUsers />;
    }
    if (IconName === "Users") {
      return <HiUserGroup />;
    }
    return <></>;
  };
  const isActive = (): string =>
    isSelected
      ? " bg-red-100 text-black border-r-4 border-r-[#FF2000] "
      : " text-gray-600 bg-white-700";

  return (
    <li className="first:mt-2 -mr-1">
      <Link
        href={url}
        className={`flex items-center space-x-2 p-2 text-2xl font-normal pl-8
                   ${isActive()}
                   hover:text-[#ff2000] hover:border-0 hover:rounded-none
                   active:text-black active:border-r-4 active:border-red-400 active:rounded-lg
                   `}
      >
        {getIcon()}
        <span className="pl-2">{Text}</span>
      </Link>
    </li>
  );
};
export default SidebarButton;
