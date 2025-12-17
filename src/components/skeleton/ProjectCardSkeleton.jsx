import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white block p-6 rounded-base shadow-xs w-full animate-pulse">
      {/* Skeleton for title */}
      <div className="h-6 bg-gray-300 rounded w-40 mb-6"></div>

      {/* Skeleton for count */}
      <div className="h-8 bg-gray-300 rounded w-12 mb-3"></div>

      {/* Skeleton for button */}
      <div className="h-10 bg-gray-300 rounded w-32"></div>
    </div>
  );
};

export default ProjectCardSkeleton;
