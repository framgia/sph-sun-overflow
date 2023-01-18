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

import Link from "next/link";

const SidebarButton = ({
  IconName,
  Text,
  isSelected,
  url,
}: SidebarButtonProps): any => {
  const getIcon = (): JSX.Element => {
    if (IconName === "Bookmark") {
      return <BookmarkIcon />;
    }
    if (IconName === "Questions") {
      return <QuestionsIcon />;
    }
    if (IconName === "Roles") {
      return <RolesIcon />;
    }
    if (IconName == "Tags") {
      return <TagsIcon />;
    }
    if (IconName === "Teams") {
      return <TeamsIcon />;
    }
    if (IconName === "Users") {
      return <UsersIcon />;
    }
    return <></>;
  };
  const isActive = (): string =>
    isSelected
      ? " bg-red-100 text-black border-r-4 border-r-red-400 "
      : " text-gray-600 bg-white-700";

  return (
    <li className="first:mt-2 -mr-1">
      <Link
        href={url}
        className={`flex items-center space-x-2 p-2 text-2xl font-normal pl-8
                   ${isActive()}
                   hover:bg-red-100 hover:text-black hover:border-0 hover:rounded-none
                   focus:bg-red-100 focus:text-black focus:border-r-4 focus:border-red-400
                   active:bg-red-100 active:text-black active:border-r-4 active:border-red-400 active:rounded-lg
                   `}
      >
        {getIcon()}
        <span className="pl-2">{Text}</span>
      </Link>
    </li>
  );
};
export default SidebarButton;
