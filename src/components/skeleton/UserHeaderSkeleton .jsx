import React from "react";

const UserHeaderSkeleton = () => {
  return (
    <header className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-6 justify-end animate-pulse">
      {/* Skeleton for welcome text */}
      <div className="h-5 bg-gray-300 rounded w-32"></div>

      {/* Skeleton for avatar */}
      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
    </header>
  );
};

export default UserHeaderSkeleton;
