  import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{}

const Button = ({...props}: Props) => {
  return (
    <>
    <input
        className=" bg-sky-700 hover:bg-sky-900 w-full text-center uppercase
       text-white py-2 font-bold"
        {...props}
    />
        
    </>
  );
};

export default Button;
