// /src/components/Navbar.tsx
import Link from 'next/link';
import { auth } from '../firebaseConfig';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
   const [user, setUser] = useState(null);

    useEffect(() => {
      return auth.onAuthStateChanged((user) => {
        setUser(user);
      });
    }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // 登出成功後的處理，例如狀態更新或跳轉
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-purple-400 text-whites">
      <Link href="/">
        <div className="font-bold">Home</div>
      </Link>
      <div>
      {user ? (
        <button onClick={handleLogout}>登出</button>
      ) : (
        <div className="flex flexjustify-between">
          <Link href="/login"> <div className="mr-4">登入</div></Link>
          <Link href="/signup"><div>註冊</div></Link>
        </div>
      )}
      </div>
    </nav>
  );
};

export default Navbar;
