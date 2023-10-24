import '../app/globals.css';
import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
      <div className="flex flex-col h-screen justify-center items-center bg-pink-200">

        {/* 主容器 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* 主標題部分 */}
          <div className="bg-pink-700 text-white p-8 text-center">React 練習專案</div>
          
          {/* 歡迎訊息部分 */}
          <div className="bg-pink-500 text-white p-8 text-center ">歡迎光臨我的專頁</div>
          
          {/* 按鈕部分 */}
          <div className=" flex justify-center p-8 bg-white">
            <Link href="/accounting">
              <button className="text-pink-400 p-1 border border-pink-400 rounded hover:bg-pink-100">點此開始</button>
            </Link>
          </div>
        </div>
      </div>
    );
}
