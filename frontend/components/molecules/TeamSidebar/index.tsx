import { useEffect, useState } from "react";
import Link from "next/link";
import { isObjectEmpty } from "@/utils";

interface ITeam {
  id: number;
  name: string;
  memberCount: number;
}

interface TeamTabProps {
  team: ITeam;
}

const TeamSidebar = () => {
  const [teams, setTeams] = useState<ITeam[]>([
    { id: 1, name: "nextjs", memberCount: 10 },
    { id: 2, name: "nextjdsdadasd", memberCount: 10 },
    { id: 3, name: "nextjs", memberCount: 20 },
    { id: 4, name: "nextjs", memberCount: 14 },
    { id: 5, name: "nextjs", memberCount: 15 },
  ] as ITeam[]);

  useEffect(() => {
    //GraphQl import
    // setTeams()
  }, []);
  return (
    <div className="p-1 m-3 drop-shadow-md">
      <div className="flex justify-between p-4 bg-primary-gray w-full rounded-tr-xl rounded-tl-xl drop-shadow-md">
        <span className="text-xl">My Teams</span>
      </div>
      <div className="bg-secondary-gray tags flex flex-wrap p-4">
        {teams.map((team, index) => {
          return (
            <TeamTab
              team={team}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const TeamTab = ({ team }: TeamTabProps) => {
  console.log(team);
  if (!isObjectEmpty(team)) {
    return (
      <Link
        className="flex w-full h-20 my-2 justify-between hover:bg-primary-gray px-2 items-center "
        href="#"
      >
        <div className="flex flex-col align-middle  max-w-20 overflow-hidden text-overflow-ellipsis">
          <div className="text-xl ">{team.name}</div>
          <div className="text-md hidden md:text-xs lg:flex">
            {team.memberCount} members
          </div>
        </div>
        <div className="align-middle hidden md:hidden lg:flex items-center h-full">
          Images
        </div>
      </Link>
    );
  }
  return <></>;
};
export default TeamSidebar;
