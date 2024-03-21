import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { LOGIN } from "@/graphql/queries.auth";
import { Button, Label, Input, ErrorToast } from "../components/";
import { useRouter } from "next/navigation";

const login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authUser] = useMutation(LOGIN);
  const router = useRouter();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if([email,password].includes("")){
      return toast.error("Todos los campos son obligatorios");
    }

    try {
      const { data } = await authUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      const token = data.authUser.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      setTimeout(() => {
        return router.push("/profile");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 capitalize text-gray-600">
          Intranet Educativa
        </h2>
        <ErrorToast />
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Email educativo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" value="Ingresar" />
        </form>
        <div className="mt-4 text-right">
          <Link
            className=" text-sky-600 hover:text-sky-800 font-bold"
            href="/recuperar-contrasena"
          >
            He olvidado mi contraseña
          </Link>
        </div>
      </div>
    </div>
  );
};

export default login;
