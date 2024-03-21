"use client";
import { GET_USER } from "@/graphql/queries.auth";
import { userToken } from "@/types";
import { useSuspenseQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import client from "@/pages/lib/client";

const useToken = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    // Realizar la consulta una vez cuando el componente se monta
    const fetchData = async () => {
      try {
        const { data } = await client.query<userToken>({
          query: GET_USER,
        });
        const userRole = data.getToken.rol.toLowerCase();
        setRole(userRole);
        setIsAuth(true); // Considera ajustar esto según la lógica de tu aplicación
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login");
        setIsLoading(false);
      }
    };

    fetchData();
    // Limpieza del efecto (opcional)
    return () => {
      // Lógica de limpieza si es necesaria
    };
   
  }, [router]);

  return {
    isLoading,
    isAuth,
    role,
  };
};

export default useToken;

