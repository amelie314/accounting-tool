/** @format */

import { useState } from "react";
import Form from "../components/Form";
import List from "../components/List";
import Link from "next/link";  // 引入 Link 元件

function Accounting() {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  const deleteRecord = (index) => {
    const newRecords = [...records];
    newRecords.splice(index, 1);
    setRecords(newRecords);
  };

  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-purple">
      <div className="bg-white p-6 rounded-lg shadow-md w-125">
        <Form onAdd={addRecord} />
        <List records={records} onDelete={deleteRecord} />
        <p className="text-dark-gray">小計：{totalAmount}</p>
        <div className="mt-4">
          <Link href="/">
            <button className="px-3 py-1 bg-light-purple text-gray-700 rounded hover:bg-purple-300">返回首頁</button>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default Accounting;
