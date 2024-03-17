import React from 'react'
import {Button, Header, Label} from "../components/"

const login = () => {
  return (
    <div>
        <h1 className=' font-bold'>Hola</h1>
        <Button
            placeholder='Iniciar sesión'
            type='button'
            value={"Iniciar Sesión"}
        />
        <Label
            htmlFor=''
        >
            Email
        </Label>
        <Header/>
    </div>
  )
}

export default login