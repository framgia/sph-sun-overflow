import { HiX } from "react-icons/hi";
type TagProps = {
  title: string;
  tagId: number;
  deleteTag: (id: number) => void;
};

const Tag = ({ title, tagId, deleteTag }: TagProps) => {
  return (
    <span className="flex flex-wrap pl-2 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-lg cursor-pointer bg-[#fba39b]">
      <span className="pr-2 break-words">{title}</span>
      <HiX
        className="rounded-xl bg hover:bg-black hover:text-white"
        onClick={() => deleteTag(tagId)}
      />
    </span>
  );
};

export default Tag;
