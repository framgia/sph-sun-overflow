import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck } from "react-icons/hi2";

import { removeItemViaId } from "@/utils";
import Tag from "../../atoms/Tag";
import { UseFormSetValue } from "react-hook-form";
export type ITag = {
  id: number;
  title: string;
  description: string;
};
interface TagInputProps {
  setValue: UseFormSetValue<any>;
}

const initialState = {
  tagsSelected: [] as ITag[],
  tagSuggestions: [] as ITag[],
  queryText: "",
};

const TagsInput = ({ setValue }: TagInputProps) => {
  let tagsSelected: ITag[];
  let setTagsSelected: (value: ITag[]) => void;
  [tagsSelected, setTagsSelected] = useState<ITag[]>(initialState.tagsSelected);
  const [tagSuggestions, setTagSuggestions] = useState<ITag[] | []>(
    initialState.tagSuggestions
  );
  const [queryText, setQueryText] = useState<string>(initialState.queryText);

  const deleteTag = (id: number): void => {
    let TempTagList = removeItemViaId(tagsSelected, id);
    setTagsSelected([...TempTagList]);
  };

  const disableInput: boolean = tagsSelected.length < 5 ? false : true;

  useEffect(() => {
    setValue("tags", tagsSelected);
  }, [tagsSelected]);

  useEffect(() => {
    //API for fetching tagSuggestions
    //setTagSuggestions()
  }, [queryText]);

  return (
    <div className="flex flex-wrap border-gray-400 border-2 w-full rounded-lg p-2">
      <Combobox
        value={tagsSelected}
        onChange={setTagsSelected}
        multiple
      >
        <span className="flex flex-row ">
          {tagsSelected.map((tag, index) => {
            let { title, id } = tag;
            return (
              <Tag
                key={index}
                title={title}
                tagId={id}
                deleteTag={deleteTag}
              />
            );
          })}
        </span>

        <Combobox.Input
          id="comboBoxInput"
          className=" border-none text-sm leading-5 text-gray-900 focus:ring-0  py-2 m-1 w-0 grow"
          onChange={(event) => setQueryText(event.target.value)}
          hidden={disableInput}
        />
        <div className="relative mt-1 w-full">
          <Transition
            as={Fragment}
            show={disableInput ? false : undefined}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQueryText("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {tagSuggestions.length === 0 && queryText !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                tagSuggestions.map((tag) => (
                  <Combobox.Option
                    key={tag.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={tag}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {tag.title}
                        </span>
                        <span className={`block truncate pl-3`}>
                          {tag.description}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <HiCheck
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default TagsInput;
