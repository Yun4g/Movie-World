"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[1000] bg-black/10 backdrop-blur-md text-white px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl text-red-500 font-bold font-mono">
          MovieWorld
        </h1>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-sm md:text-base font-semibold items-center">
          <Link
            href="/login"
            className="hover:text-red-500 transition duration-300"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="bg-red-900 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center font-semibold">
          <Link
            href="/login"
            className="block text-white hover:text-red-500 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="block bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
