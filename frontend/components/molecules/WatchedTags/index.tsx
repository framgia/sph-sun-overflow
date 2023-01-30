import { useState } from "react";
import { removeItemViaId } from "@/utils";
import { HiPencil, HiX } from "react-icons/hi";
import CustomCombobox from "@/components/molecules/CustomComboBox";
import Link from "next/link";
import { useQuery } from "@apollo/client";
const WatchedTags = () => {
  const [watchedTags, setWatchedTags] = useState([
    { id: 1, title: "nextjs" },
    { id: 2, title: "nextjdsdadasd" },
    { id: 3, title: "nextjs" },
    { id: 4, title: "nextjs" },
    { id: 5, title: "nextjs" },
  ]);

  const [viewAdd, setViewAdd] = useState(false);

  const isVisible = viewAdd ? "flex" : "hidden";
  const handleSubmit = (val: any) => {
    console.log(val);
  };
  const toggleVisible = () => {
    setViewAdd(!viewAdd);
  };

  const removeWatchedTag = (id: number): void => {
    //Graphql send mutation to remove watchtag then update the watchedTags
    let TempTagList = removeItemViaId(watchedTags, id);
    setWatchedTags([...TempTagList]);
  };

  return (
    <div className="p-1 m-3">
      <div className="flex justify-between p-4 bg-primary-gray w-full rounded-tr-xl rounded-tl-xl drop-shadow-md">
        <span className="align-left text-xl">Watched Tags</span>
        <div className="">
          <HiPencil
            className="text-2xl cursor-pointer"
            onClick={toggleVisible}
          />
        </div>
      </div>
      <div className="bg-secondary-gray">
        <div className="tags flex flex-wrap p-4 rounded-xl">
          {watchedTags.map((tag, index) => {
            return (
              <div
                key={index}
                className="py-0.5 px-1 mx-0.5 my-1 flex items-center max-w-20 overflow-hidden text-overflow-ellipsis bg-red-400 rounded-2xl"
              >
                <Link
                  className="label px-1 text-sm"
                  href="#"
                >
                  {tag.title}
                </Link>
                <HiX
                  className="rounded-xl bg hover:bg-black hover:text-white cursor-pointer"
                  onClick={() => {
                    removeWatchedTag(tag.id);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className={`${isVisible} w-full p-1`}>
          <CustomCombobox
            setValue={handleSubmit}
            hasBtn={true}
            btnName="Add Tag"
            placeholder="Insert Tag"
            extraInputClasses=" rounded-tl-xl rounded-bl-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default WatchedTags;
