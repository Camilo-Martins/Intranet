"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import useToken from "@/hooks/useToken";
import NavBar from "@/components/NavBar";
import {
  MantenedorAnotaciones,
  MantenedorAsistencias,
  MantenedorCursos,
  MantenedorNotas,
  MantenedorUsuarios,
} from "@/components";




const admin = () => {
  const [isUser, setIsUser] = useState(false);
  const [isGrade, setIsGrade] = useState(false);
  const [isNotas, setIsNotas] = useState(false);
  const [isAssist, setAssist] = useState(false);
  const [isAnotations, setIsAnotations] = useState(false);
  const { isLoading, role } = useToken();
  const pathname = usePathname();
  const router = useRouter();

  if (isLoading) {
    return;
  }

  if (`/profile/${role}` !== pathname) {
    return router.push(`/profile/${role}`);
  }

  //Aquí la lógica del componente

  return (
    <>
      <NavBar
        isUser={isUser}
        setIsUser={setIsUser}
        isGrade={isGrade}
        setIsGrade={setIsGrade}
        isNotas={isNotas}
        setIsNotas={setIsNotas}
        isAssist={isAssist}
        setIsAssist={setAssist}
        isAnotations={isAnotations}
        setIsAnotations={setIsAnotations}
      />
      <div className="container mx-auto py-10">
        {isUser && <MantenedorUsuarios />}
        {isGrade && <MantenedorCursos />}
        {isNotas && <MantenedorNotas />}
        {isAssist && <MantenedorAsistencias />}
        {isAnotations && <MantenedorAnotaciones />}
      </div>
    </>
  );
};

export default admin;
