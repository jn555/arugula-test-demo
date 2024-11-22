"use client";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams(); // Use `useParams` to get dynamic route params
  const user = params.user; // Extract the 'forum' param
  return (
  
  <div className="bg-gradient-to-b from-orange-100 to-orange-200 min-h-screen text-sm text-gray-900">
      {/* Main Content */}
      <main className="p-6">
        {/* Board Categories */}
        <div className="bg-green-100 rounded w-1/2">
          {/* Top Section */}
          <header className="bg-green-700 text-gray-200 p-4 border-b border-black">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">{user}'s Profile</h1>
            </div>
          </header>
        </div>
      </main>

  </div>
  )
};

export default page;
