import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";

export default function Home() {
  const { role, isLoading } = useToken();
  const router = useRouter();

  if (isLoading) {
    return;
  }

  switch (role) {
    case "admin":
      router.push(`/profile/${role}/`);
      break;
    case "principal":
      router.push(`/profile/${role}/`);
      break;
    case "teacher":
      router.push(`/profile/${role}/`);
      break;
    case "coordinator":
      router.push(`/profile/${role}/`);
      break;
    case "student":
      router.push(`/profile/${role}/`);
      break;
    default:
      router.push(`/login`);
      break;
     
  }

  return <></>;
}
