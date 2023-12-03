import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 max-w-6xl m-auto">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <h2>
            <span className="text-2xl bg-yellow-500 px-2 py-1 rounded-lg text-white font-bold mr-1">
              Popcorn
            </span>
            <span className="text-xl hidden sm:inline">Time</span>
          </h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;
