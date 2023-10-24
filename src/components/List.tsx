/** @format */

type ListProps = {
  records: {
    amount: number;
    detail: string;
  }[];
  onDelete: (index: number) => void;
};

function List({ records, onDelete }: ListProps) {  // 指定ListProps 類型
  return (
    <ul>
      {records.map((record, index) => (
        <li key={index} className="text-purple-400 flex justify-between mb-1">
        💲 {record.amount} 📒 {record.detail}
          <button className="text-pink-400 p-1 border border-pink-400 rounded hover:bg-pink-100" onClick={() => onDelete(index)}>刪除</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
