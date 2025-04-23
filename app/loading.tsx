import React from 'react';

function Loading() {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <span className="ml-4 text-lg text-gray-700"></span>
    </div>
  );
}

export default Loading;
