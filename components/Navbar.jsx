"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
  const { data, status } = useSession();
  const user = data?.user;
  const fLetter = user?.name?.charAt(0).toUpperCase();
  if (status === "loading") {
    return <div className="p-4">Loading...</div>;
  }
  return (
    <>
      <div className="navbar z-999 bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              {user && (
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              )}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Shopless</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            {user && (
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            )}
          </ul>
        </div>
        {!user && (
          <div className="navbar-end">
            <Link href="/register" className="btn">
              Sign up
            </Link>
          </div>
        )}
        {user && (
          <div className="navbar-end flex gap-2.5">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
            {fLetter}
            </div>
            <Link href='/login' className="text-sm text-red-600 btn" onClick={() => signOut()}>Logout</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
