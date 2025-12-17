import React from "react";

const AboutSkeleton = () => {
  return (
    <div className="bg-white block p-6 rounded-base shadow-xs w-full animate-pulse">
      {/* Skeleton for text */}
      <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-4/6"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/6"></div>

      {/* Skeleton for button (Read more) */}
      <div className="h-6 w-24 bg-gray-300 rounded mt-4 mb-2"></div>

      {/* Skeleton for portfolio button */}
      <div className="h-10 w-32 bg-gray-300 rounded mt-2"></div>
    </div>
  );
};

export default AboutSkeleton;
