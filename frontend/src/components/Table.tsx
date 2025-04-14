import { useNavigate } from "react-router-dom";

interface TableProps<T> {
  columns: string[];
  data: T[];
  table_name: string;
}

const Table = <T extends { id?: number }>({
  columns,
  data,
  table_name,
}: TableProps<T>) => {
  const navigate = useNavigate();

  const formatHeader = (col: string) =>
    col === "id"
      ? ""
      : col.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="overflow-x-auto shadow-sm border-b border-[#e5e7eb] rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-white">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-4 px-6 text-left text-md md:text-lg font-semibold border-b tracking-wider"
              >
                {formatHeader(col)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white">
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                console.log("row.id", row.id, row.id !== undefined, table_name);
                if (row.id !== undefined) {
                  navigate(`/${table_name}/edit/${row.id}`);
                }
              }}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="py-4 px-6 text-md md:text-lg text-gray-800"
                >
                  {col === "id" ? ">" : String(row[col as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
