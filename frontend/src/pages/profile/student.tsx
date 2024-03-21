import useToken from '@/hooks/useToken';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

const student = () => {
  const { isLoading, role } = useToken();
  const pathname = usePathname();
  const router = useRouter();

  if (isLoading) {
    return;
  }

  if (role !== pathname) {
    return router.push(`/profile/${role}`);
  }
  
  return (
    <div>Student</div>
  )
}

export default student