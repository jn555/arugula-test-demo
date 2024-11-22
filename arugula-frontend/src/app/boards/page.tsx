import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-orange-100 to-orange-200 min-h-screen text-sm text-gray-900">
      {/* Main Content */}
      <main className="p-6">
        {/* Board Categories */}
        <div className="bg-green-100 rounded w-1/2">
          {/* Top Section */}
          <header className="bg-green-700 text-gray-200 p-4 border-b border-black">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Boards</h1>
              <button className="bg-green-800 px-2 py-1 rounded text-white">
                Options ▼
              </button>
            </div>
          </header>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3 grid grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded">
                <h2 className="font-bold underline mb-2">Intersts</h2>
                <ul>
                  <li>
                    <Link href="/boards/mu">Music</Link>
                  </li>
                  <li>
                    <Link href="/boards/lit">Literature</Link>
                  </li>
                  <li>
                    <Link href="/boards/tech">Technology</Link>
                  </li>
                </ul>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <h2 className="font-bold underline mb-2">Video Games</h2>
                <ul>
                  <li>MMO</li>
                  <li>RPG</li>
                  <li>FPS</li>
                </ul>
              </div>
              <div className="bg-green-100 p-4 rounded">
                <h2 className="font-bold underline mb-2">Hobbies</h2>
                <ul>
                  <li>MMO</li>
                  <li>RPG</li>
                  <li>FPS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* User Info */}
      <div className="bg-green-100 p-4 rounded text-right">
        <h2 className="font-bold bg-green-700 text-gray-200 p-2 rounded">
          Hello, Strappnasti!
        </h2>
      </div>

      {/* Stats Section */}
      <footer className="bg-orange-100 text-red-800">
        <div className="bg-orange-200 border border-red-700 p-2">
          <h2 className="text-lg font-bold text-red-800">Stats</h2>
          <div className="col-span-3 grid grid-cols-3 text-center">
            <div>
              <h3 className="font-bold">Total Posts:</h3>
              <p>4,909,781,617</p>
            </div>
            <div>
              <h3 className="font-bold">Accounts Created:</h3>
              <p>Current Users: 224,081</p>
            </div>
            <div>
              <h3 className="font-bold">Active Content:</h3>
              <p>1133 GB</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center mt-4 text-orange-900 border-t border-red-700 text-center">
          <Link
            href="/"
            className="border border-red-700 bg-orange-100 px-4 py-1 text-red-800 hover:bg-orange-200"
          >
            Home
          </Link>
          <Link
            href="/news"
            className="border border-red-700 bg-orange-100 px-4 py-1 text-red-800 hover:bg-orange-200"
          >
            News
          </Link>
          <Link
            href="/blog"
            className="border border-red-700 bg-orange-100 px-4 py-1 text-red-800 hover:bg-orange-200"
          >
            Blog
          </Link>
          <Link
            href="/faq"
            className="border border-red-700 bg-orange-100 px-4 py-1 text-red-800 hover:bg-orange-200"
          >
            FAQ
          </Link>
          <Link
            href="/rules"
            className="border border-red-700 bg-orange-100 px-4 py-1 text-red-800 hover:bg-orange-200"
          >
            Rules
          </Link>
          <Link
            href="/support"
            className="border border-red-700 bg-orange-100 px-4 py-1 text-red-800 hover:bg-orange-200"
          >
            Support Arugula
          </Link>
          <Link
            href="/advertise"
            className="border border-red-700 bg-orange-100 px-4 py-1 text-red-800 hover:bg-orange-200"
          >
            Advertise
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
