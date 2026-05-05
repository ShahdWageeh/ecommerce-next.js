"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

function AddBtn() {
  const { data } = useSession();
  const user = data?.user;
  return (
    <>
      {user && (
        <Link
          className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
          href="/addForm"
        >
          + Add Product
        </Link>
      )}
    </>
  );
}

export default AddBtn;
