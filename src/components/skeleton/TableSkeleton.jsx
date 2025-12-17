import React from "react";

const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <table className="text-sm text-body rounded-base w-full animate-pulse">
      {/* Table header skeleton */}
      <thead>
        <tr className="border-b border-gray-200 bg-blue-50">
          {Array.from({ length: columns }).map((_, index) => (
            <th
              key={index}
              className="px-6 py-3 font-medium text-left"
            >
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </th>
          ))}
        </tr>
      </thead>

      {/* Table body skeleton */}
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-200">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <td key={colIndex} className="px-6 py-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
