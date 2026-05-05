"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DeleteModal({ productId }) {
  const { data } = useSession();
  const user = data?.user;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }
      setOpen(false);
      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {user && (
        <button onClick={() => setOpen(true)} className="btn btn-error w-[49%]">
          Delete
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-999 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-75 text-center">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

            <p className="text-gray-500 mb-6">
              This product will be permanently deleted
            </p>

            <div className="flex gap-3">
              <button onClick={() => setOpen(false)} className="btn w-1/2">
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="btn btn-error w-1/2"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
