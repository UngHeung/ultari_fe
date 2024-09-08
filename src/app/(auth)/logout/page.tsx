'use client';

import handleLogout from '@/components/auth/handlers/handleLogout';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const logout = () => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        await handleLogout();
      } catch (error: any) {
        console.log('Logout error : ', error.message);
      } finally {
        router.back();
      }
    })();
  });
  return <></>;
};

export default logout;
