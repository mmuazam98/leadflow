import { memo } from "react";

const TableSkeleton: React.FC<{ rows: number }> = ({ rows }) => {
  return (
    <>
      {[...Array(rows)].map((index) => (
        <tr key={index} className="border-b border-gray-200 animate-pulse">
          <td className="py-3 px-4">
            <div className="h-4 w-4 bg-gray-200 rounded" />
          </td>
          <td className="py-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
            </div>
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </td>
          <td className="py-3 px-4">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1.5 h-5 rounded-sm bg-gray-200" />
              ))}
            </div>
          </td>
          <td className="py-3 px-4">
            <div className="h-5 w-24 bg-gray-200 rounded-full" />
          </td>
          <td className="py-3 px-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </td>
          <td className="py-3 px-4">
            <div className="h-5 w-5 bg-gray-200 rounded" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default memo(TableSkeleton);
