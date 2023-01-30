import { useEffect, useState } from "react";
import Link from "next/link";
import { isObjectEmpty } from "@/utils";

interface IUser {
  id: number;
  name: string;
  role: string;
}
interface UserTabProps {
  user: IUser;
}
const TeamMemberSidebar = () => {
  const [members, setMembers] = useState<IUser[]>([
    { id: 1, name: "nextjs", role: "FE" },
    { id: 2, name: "nextjdsdadasd", role: "FE" },
    { id: 3, name: "nextjs", role: "FE" },
    { id: 4, name: "nextjs", role: "BE" },
    { id: 5, name: "nextjs", role: "BE" },
  ] as IUser[]);

  return (
    <div className="p-1 m-3 drop-shadow-md">
      <div className="flex justify-between p-4 bg-primary-gray w-full rounded-tr-xl rounded-tl-xl">
        <span className="text-xl">Team Members</span>
        <div className="text-lg text-under">Manage</div>
      </div>
      <div className="bg-secondary-gray tags flex flex-wrap p-4">
        {members.map((member, index) => {
          return (
            <UserTab
              user={member}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const UserTab = ({ user }: UserTabProps) => {
  if (!isObjectEmpty(user)) {
    return (
      <Link
        className="flex w-full h-20 my-2 hover:bg-primary-gray px-2 items-center overflow-hidden text-overflow-ellipsis"
        href="#"
      >
        <img
          className="w-[40px] h-[40px] rounded-full sm:mx-3 text-sm bg-gray-800 rounded-full md:mr-0 active:ring-2 active:ring-red-500"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="user photo"
          width={15}
          height={15}
        />
        <div className="flex flex-col align-middle ml-2 overflow-hidden text-overflow-ellipsis">
          <div className="text-xl ">{user.name}</div>
          <div className="text-md hidden lg:flex">{user.role}</div>
        </div>
      </Link>
    );
  }

  return <></>;
};
export default TeamMemberSidebar;
