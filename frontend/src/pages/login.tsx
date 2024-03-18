import React from 'react'
import {Button, Header, Label, Input} from "../components/"
import Link from 'next/link'

const login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 capitalize text-gray-600">Intranet Educativa</h2>
        <form className="space-y-4">
          <div>
          <Label
            htmlFor='email'
          >
            Email
          </Label>
           <Input
            type='text'
            id='email'
            placeholder='Email educativo'
           />
          </div>
          <div>
           <Label
            htmlFor='password'
           >
            Contraseña
           </Label>
           <Input
            type='password'
            id='password'
            placeholder='***********'
           />
          </div>
          <Button
            type='submit'
            value="Ingresar"
          />
             
          
        </form>
        <div className="mt-4 text-right">
          <Link
          className=' text-sky-600 hover:text-sky-800 font-bold'
          href="/recuperar-contrasena">He olvidado mi contraseña</Link>
        </div>
      </div>
    </div>
  )
}

export default login