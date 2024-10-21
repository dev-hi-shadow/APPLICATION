/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/react";

const NextInput = ({
  className = "",
  onChange = () => {},
  onBlur = () =>  {},
  value = "",
  name = "",
  type = "text",
  isRequired = true,
  placeholder = "",
  touched = {},
  errors = {},
  label = "",
  startContent = "",
  endContent = "",
  helperText = "",
  errorMessage = "",
  isInvalid = "",
  ...rest
}) => {
  return (
    <Input
      className={`my-2 ${className}`}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      label={label}
      name={name}
      startContent={startContent}
      endContent={endContent}
      type={type}
      helperText={helperText}
      isRequired={isRequired || true}
      placeholder={placeholder}
      isInvalid={isInvalid || (touched[name] && errors[name])}
      errorMessage={errorMessage || (touched[name] && errors[name])}
      {...rest}
    />
  );
};

export default NextInput;
