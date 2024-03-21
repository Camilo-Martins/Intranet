"use client";
import useToken from "@/hooks/useToken";
import { usePathname, useRouter } from "next/navigation";

const principal = () => {
  const { isLoading, role } = useToken();
  const pathname = usePathname();
  const router = useRouter();

  if (isLoading) {
    return;
  }

  if (role !== pathname) {
    return router.push(`/profile/${role}`);
  }

  //Lógica vista director

  return (
    <>
      <div className="bg-black">
        <h1 className=" text-4xl font-bold text-white"> HOLAAAAAAAAAAAAA</h1>
      </div>
    </>
  );
};

export default principal;
