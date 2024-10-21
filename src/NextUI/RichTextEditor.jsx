import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({
  value = null,
  handleChange = () => {},
  handleBlur = () => {},
  errors = {},
  touched = {},
  className = "",
}) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      className={className}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
export default RichTextEditor;
