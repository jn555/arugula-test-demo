"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="bg-green-700 text-gray-200 p-4 border-b border-black flex items-center">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/arugula_clear.png" // Replace with your icon path
          alt="Logo"
          height={200}
          width={200}
          priority
        />
      </Link>

      <div className="flex flex-col items-center ml-auto">
        <p>Active Users: {}</p>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-1 border border-gray-400 rounded-sm text-black"
          />
          <button className="ml-2 bg-gray-300 text-black px-3 py-1 rounded-sm">
            Search
          </button>
        </div>

        <ul className="flex space-x-4 text-sm ml-4">
          <li>
            <Link href="/profile" className="hover:underline">
              Profile
            </Link>
          </li>
          <li>
            <Link href="/boards" className="hover:underline">
              Boards
            </Link>
          </li>
          <li>
            <Link href="/video-chat" className="hover:underline">
              Video Chat
            </Link>
          </li>
          <li>
            <Link href="/about-help" className="hover:underline">
              About/Help
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
