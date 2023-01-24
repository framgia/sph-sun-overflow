import React, { useEffect } from "react";
import TagsInput, { ITag } from "../../molecules/TagsInput";
import QuestionFormSchema from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isObjectEmpty } from "@/utils";
import FormAlert from "@/components/molecules/FormAlert";
import Button from "@/components/atoms/Button";
import RichTextEditor from "@/components/molecules/RichTextEditor";
export type FormValues = {
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
  } = useForm<FormValues>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(QuestionFormSchema),
  });

  const onSubmit = (data: FormValues) => {
    if (isObjectEmpty(errors)) {
      //Replace with graphql post request
      console.log(data);
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
        <div className="QuestionTitle self-center w-4/5 py-4">
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
        <div className="Description self-center w-4/5 mb-8 py-4">
          <label
            htmlFor="descriptionInput"
            className="font-bold mb-2"
          >
            Description
          </label>
          <RichTextEditor
            setValue={setValue}
            usage="description"
            id="descriptionInput"
          />
        </div>
        <div className="Tags self-center w-4/5 py-4">
          <label
            htmlFor="tagsInput"
            className="font-bold "
          >
            Tags (max. 5)
          </label>
          <TagsInput setValue={setValue} />
        </div>
        {!isObjectEmpty(errors) && <FormAlert errors={errors} />}
        <div className="Submit self-center w-4/5 py-4">
          <div className="float-right">
            <Button
              usage="primary"
              type="submit"
            >
              Post Question
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
