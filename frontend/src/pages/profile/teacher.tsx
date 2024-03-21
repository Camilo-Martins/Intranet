import useToken from "@/hooks/useToken";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const teacher = () => {
  const { isLoading, role } = useToken();
  const pathname = usePathname();
  const router = useRouter();

  if (isLoading) {
    return;
  }

  if (role !== pathname) {
    return router.push(`/profile/${role}`);
  }

  return <div>teacher</div>;
};

export default teacher;
