/** @format */

import "../app/globals.css";
import { useState } from "react";

interface FormProps {
  onAdd: (item: 
              { amount: number; 
                detail: string 
          }) => void;
}

function Form({ onAdd }: FormProps) {
  const [amount, setAmount] = useState("");
  const [detail, setDetail] = useState("");
  const [type, setType] = useState("income"); 

  const handleSubmit = () => {
    const finalAmount =
      type === "income" ? Number(amount) : Number(amount) * -1; 
    onAdd({ amount: finalAmount, detail });
    setAmount("");
    setDetail("");
  };

  return (
      <div>
        <h1 className="text-2xl font-bold text-center mb-4 text-dark-purple">
          記帳表單
        </h1>
        <div className="flex justify-between items-center mb-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-2 w-28 border rounded-md text-dark-gray bg-white"
          >
            <option value="income">收入</option>
            <option value="expense">支出</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="金額"
            className="p-2 w-28 border rounded-md text-black bg-white mx-2"
          />
          <input
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="明細"
            className="p-2 w-28 border rounded-md text-black bg-white"
          />
          <button
            onClick={handleSubmit}
            className="bg-purple-300 text-white p-2 ml-2 rounded hover:bg-purple-400 focus:outline-none"
          >
            新增
          </button>
        </div>
      </div>
  );
}

export default Form;
