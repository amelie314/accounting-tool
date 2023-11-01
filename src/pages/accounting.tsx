// /** @format */

// import React, { useState, useEffect } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { collection, getDocs, doc } from 'firebase/firestore';
// import { db, auth } from '../firebaseConfig';
// import Form from "../components/Form";
// import List from "../components/List";


// function Accounting() {
//   const [user, setUser] = useState(null);
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     // 監聽用戶登入狀態
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//         fetchRecords(user.uid); // 當用戶登入時，獲取他們的記帳記錄
//       } else {
//         setUser(null);
//         // 這裡您可以加入重定向到登入頁面的邏輯
//       }
//     });

//     return () => unsubscribe(); // 記得在組件卸載時取消監聽
//   }, []);

//   // 從 Firestore 獲取記帳記錄
//   const fetchRecords = async (userId) => {
//     const recordsSnapshot = await db.collection('users').doc(userId).collection('records').get();
//     const recordsData = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setRecords(recordsData);
//   };
  

//   // 添加新的記帳記錄到 Firestore
//   const addRecordToFirestore = async (record) => {
//     if (user) {
//       await store.collection('users').doc(user.uid).collection('records').add(record);
//       fetchRecords(user.uid); // 添加成功後，重新獲取記錄
//     }
//   };

//   // 刪除 Firestore 中的記帳記錄
//   const deleteRecordFromFirestore = async (recordId) => {
//     if (user && recordId) {
//       await store.collection('users').doc(user.uid).collection('records').doc(recordId).delete();
//       fetchRecords(user.uid); // 刪除成功後，重新獲取記錄
//     }
//   };

//   // 計算總額
//   const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-light-purple">
//       <div className="bg-white p-6 rounded-lg shadow-md w-125">
//         <Form onAdd={addRecordToFirestore} />
//         <List records={records} onDelete={deleteRecordFromFirestore} />
//         <p className="text-dark-gray">小計：{totalAmount}</p>
//         <div className="mt-4">
//           <Link href="/">
//             <div className="px-3 py-1 bg-light-purple text-gray-700 rounded hover:bg-purple-300">返回首頁</div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Accounting;
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { collection, getDocs, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import Form from "../components/Form";
import List from "../components/List";

function Accounting() {
  const [user] = useAuthState(auth);
  const [records, setRecords] = useState([]);
  const router = useRouter();

  // 登錄成功後自動跳轉
  useEffect(() => {
    if (user) {
      fetchRecords(user.uid);
    } else {
      router.push('/login'); // 用戶未登錄時跳轉至登錄頁面
    }
  }, [user, router]);

  const fetchRecords = async (userId) => {
    const recordsColRef = collection(db, 'users', userId, 'accountingRecords');
    const recordsSnapshot = await getDocs(recordsColRef);
    const recordsData = recordsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecords(recordsData);
  };

  // 添加新的記帳記錄到 Firestore
  const addRecordToFirestore = async (newRecord) => {
    if (!user) return;
    const recordsColRef = collection(db, 'users', user.uid, 'accountingRecords');
    await addDoc(recordsColRef, newRecord);
    fetchRecords(user.uid); // 添加成功後，重新獲取記錄
  };
  // 刪除 Firestore 中的記帳記錄
  const deleteRecordFromFirestore = async (recordId: string) => {
    if (!user || !recordId) return;
    try {
      const recordRef = doc(db, 'users', user.uid, 'accountingRecords', recordId);
      await deleteDoc(recordRef);
      fetchRecords(user.uid); // 刪除成功後，重新獲取記錄
    } catch (error) {
      console.error("無法刪除記錄:", error);
    }
  };

  // 計算總額
  const totalAmount = records.reduce((sum, record) => sum + (record.amount || 0), 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-purple">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <Form onAdd={addRecordToFirestore} />
        <List records={records} onDelete={deleteRecordFromFirestore} />
        <div className="text-dark-gray mt-2">小計：{totalAmount}</div>
        <div className="mt-4">
          <Link href="/">
            <div className="px-3 py-1 bg-light-purple text-gray-700 rounded hover:bg-purple-300">返回首頁</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Accounting;
