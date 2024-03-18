import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: Props) => {
  return (
    <>
      <input
        className="mt-1 block w-full 
        rounded-md 
        border-gray-300 
        shadow-sm 
        focus:ring-opacity-50
        focus:outline-none
        "
        {...props}
      />
    </>
  );
};

export default Input;
