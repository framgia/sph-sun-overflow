import { useEffect, useState } from "react";
import SidebarButton from "../molecules/SidebarButton";
import { useRouter } from "next/router";
const Sidebar = (): JSX.Element => {
  const router = useRouter();
  const [active, setActive] = useState("");

  const isSelected = (title: string): boolean => {
    if (router.asPath === title) {
      return true;
    }
    return false;
  };

  return (
    <ul className="absolute inset-y-0 left-0 w-1/5 border-r-4 border-gray-300 -ml-4 pt-32 bg-white">
      <SidebarButton
        IconName="Questions"
        Text="Questions"
        isSelected={isSelected("/questions")}
        url="/questions"
      />

      <SidebarButton
        IconName="Roles"
        Text="Roles"
        isSelected={isSelected("/roles")}
        url="/roles"
      />
      <SidebarButton
        IconName="Users"
        Text="Users"
        isSelected={isSelected("/users")}
        url="/users"
      />
      <SidebarButton
        IconName="Tags"
        Text="Tags"
        isSelected={isSelected("/tags")}
        url="/tags"
      />
      <SidebarButton
        IconName="Teams"
        Text="Teams"
        isSelected={isSelected("/teams")}
        url="/teams"
      />
    </ul>
  );
};

export default Sidebar;
