import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const RichTextEditor = () => {
  const [modules, setModules] = useState({
    toolbar: [
      [{ header: [1, 2, false] }],
      [
        {
          color: ["red", "blue", "yellow", "green", "orange", "pink", "black"],
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
  });
  const [formats, setfFormats] = useState([
    "header",
    "color",
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
  ]);

  const ReactQuill = dynamic(
    () => {
      return import("react-quill");
    },
    { ssr: false }
  );

  return (
    <ReactQuill
      className="border-2 border"
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
