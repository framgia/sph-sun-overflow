import React, { useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import TagsInput, { ITag } from "../../molecules/TagsInput";
import Editor from "../../atoms/Editor";
import QuestionFormSchema from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isObjectEmpty } from "@/utils";
type QuestionPayload = {
  title: string;
  description: string;
  tags: ITag[];
};

const QuestionForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuestionPayload>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(QuestionFormSchema),
  });

  const onSubmit = (data: QuestionPayload) => {
    if (isObjectEmpty(errors)) {
      //Replace with graphql post request
    }
  };

  useEffect(() => {
    register("description", {});
    setValue("description", "");
    register("tags", {});
    setValue("tags", []);
  }, [register]);

  return (
    <div className=" md:w-2/5 lg:w-1/2 bg-gray-50 border-2 border-gray-500 m-2 ">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="QuestionTitle self-center w-4/5 p-6">
          <label
            htmlFor="titleInput"
            className="font-bold mb-2"
          >
            Question Title
          </label>
          <input
            id="titleInput"
            type="text"
            className={`border-gray-400 border-2 w-full rounded-lg`}
            {...register("title", {})}
          />
        </div>
        <div className="Description self-center w-4/5 p-6 mb-8">
          <label
            htmlFor="descriptionInput"
            className="font-bold mb-2"
          >
            Description
          </label>
          <Editor setValue={setValue} />
        </div>
        <div className="Tags self-center w-4/5 p-6">
          <label
            htmlFor="tagsInput"
            className="font-bold "
          >
            Tags (max. 5)
          </label>
          <TagsInput setValue={setValue} />
        </div>
        {!isObjectEmpty(errors) && (
          <div
            className="flex self-center w-4/5 p-6 mb-4 text-sm text-red-800 rounded-lg border-2 border-red-800"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">
                Ensure that these requirements are met:
              </span>
              <ul className="mt-1.5 ml-4 list-disc list-inside">
                {Object.values(errors).map((errorText, index) => {
                  return <li key={index}>{errorText.message}</li>;
                })}
              </ul>
            </div>
          </div>
        )}
        <div className="Submit self-center w-4/5 p-6">
          <button
            type="submit"
            className="border-2 border-red-400 rounded-lg text-red-400 p-2 float-right px-4 "
          >
            Post Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
