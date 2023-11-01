import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (event) => {
    event.preventDefault();
    const auth = getAuth(app);

    try {

      await createUserWithEmailAndPassword(auth, email, password);
      // router.push('/accounting'); // 註冊成功，導向至 accounting 頁面
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#D8CFF4", minHeight: "100vh" }}>
      <form onSubmit={handleSignup}>
        <input 
          className="text-black p-1 m-3  border rounded-md text-dark-purple" 
          type="email" 
          value={email}  
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required
          />
        <input 
          className="text-black p-1 m-3  border rounded-md text-dark-purple"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button className="text-dark-purple p-1 bg-purple-100 border rounded-md" type="submit">註冊</button>
      </form>
    </div>
  );
};

export default Signup;
