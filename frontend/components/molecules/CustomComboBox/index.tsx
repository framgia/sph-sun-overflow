import React, { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck } from "react-icons/hi2";
import { UseFormSetValue } from "react-hook-form";
export interface ITag {
  id: number;
  title: string;
  description: string;
}
interface ComboboxProps {
  setValue: ((value: any) => void) | UseFormSetValue<any>;
  hasBtn: boolean;
  btnName: string;
  placeholder: string;
  extraInputClasses: string;
}

const initialState = {
  tagsSelected: [],
  suggestions: [{ id: 1, title: "nextjs", description: "desc" }],
  queryText: "",
};

const CustomCombobox = ({
  setValue,
  hasBtn = false,
  btnName = "Submit",
  placeholder = "Input",
  extraInputClasses = "",
}: ComboboxProps) => {
  const [selected, setSelected] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<ITag[] | []>(
    initialState.suggestions
  );
  const [queryText, setQueryText] = useState<string>(initialState.queryText);

  useEffect(() => {
    //API for Suggestions
  }, [queryText]);

  const handleSubmit = (e: React.MouseEventHandler<HTMLElement>) => {
    if (selected !== null) {
      setValue(selected);
      setSelected(null);
    }
  };

  return (
    <div className="flex flex-wrap w-full p-4">
      <Combobox
        value={selected}
        onChange={setSelected}
      >
        <div className="flex w-full py-2">
          <Combobox.Input
            id="comboBoxInput"
            placeholder={placeholder}
            className={`border-none text-sm leading-5 text-gray-900 focus:ring-0 w-0 grow ${extraInputClasses}`}
            onChange={(event) => setQueryText(event.target.value)}
            displayValue={(suggestion) => {
              if (suggestion) {
                return suggestion.title;
              }
              return null;
            }}
          />
          {hasBtn && (
            <div
              className="flex bg-primary-red text-white items-center h-full -mr-1 px-2 hover:bg-secondary-red cursor-pointer rounded-tr-xl rounded-br-xl"
              onClick={handleSubmit}
            >
              {btnName}
            </div>
          )}
        </div>

        <div className="relative mt-1 w-full">
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQueryText("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {suggestions.length === 0 && queryText !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                suggestions.map((suggestion) => (
                  <Combobox.Option
                    key={suggestion.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={suggestion}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {suggestion.title}
                        </span>
                        <span className={`block truncate pl-3`}>
                          {suggestion.description}
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

export default CustomCombobox;
