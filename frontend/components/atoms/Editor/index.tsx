import dynamic from "next/dynamic";
import { ComponentType, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

type EditorProps = {
  setValue: UseFormSetValue<any>;
};
interface RQProps {
  theme: string;
  modules: { toolbar: any[] };
  formats: string[];
  style: { [key: string]: any };
  onChange: (editor: string) => void;
  id: string;
}
const ReactQuill: ComponentType<RQProps> = dynamic(
  (): Promise<any> => import("react-quill"),
  {
    ssr: false,
  }
);

const modules = {
  toolbar: [
    [
      { header: [1, 2, false] },
      {
        color: ["black", "red", "blue", "yellow"],
      },
    ],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
];

const Editor = ({ setValue }: EditorProps): any => {
  const handleEditor = (editor: string) => {
    setValue("description", editor);
  };
  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      style={{ height: "10rem" }}
      onChange={handleEditor}
      id="descriptionInput"
    />
  );
};

export default Editor;
