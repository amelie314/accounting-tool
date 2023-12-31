import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/accounting'); // 如果用戶已登錄，跳轉到 accounting 頁面
    }
  }, [user, router]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError(''); // 重置錯誤訊息

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 登錄成功後，useEffect 將會處理跳轉
    } catch (error) {
      // 登錄失敗，顯示錯誤訊息
      console.error('登錄過程中發生錯誤:', error);
      setLoginError('登錄資料無效，請重新輸入。');
      alert('登錄資料無效，請重新輸入。'); // 或使用更友好的 UI 通知使用者
    }
  };

  // 如果頁面正在加載，您也可以在這裡處理加載狀態的顯示

  return (
    <div style={{ backgroundColor: "#D8CFF4", minHeight: "100vh" }}>
      <form onSubmit={handleLogin}>
        <input  className="text-black p-1 m-3  border rounded-md text-dark-purple" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input  className="text-black p-1 m-3 border rounded-md text-dark-purple" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button className="text-dark-purple p-1 bg-purple-100 border rounded-md" type="submit">登入</button>
      </form>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
