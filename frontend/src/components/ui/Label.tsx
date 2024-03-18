import React from 'react'

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>{};

const Label = ({children,...props}: Props) => {
  return (
    <>
        <label className='block text-gray-600 text-xl capitalize font-bold pb-1'
        {...props}>{children}</label>
    </>
  )
}

export default Label