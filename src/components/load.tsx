

import React from "react";

const LoadingModal = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900/30">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
};

export default  LoadingModal;