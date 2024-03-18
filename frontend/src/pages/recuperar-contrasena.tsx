import { Button, Input, Label } from '@/components'
import Link from 'next/link'
import React from 'react'

const recuperar = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 capitalize text-gray-600">Recuperar contraseña</h2>
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
            placeholder='Email Personal'
           />
          </div>
          <Button
            type='submit'
            value="Enviar"
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

export default recuperar