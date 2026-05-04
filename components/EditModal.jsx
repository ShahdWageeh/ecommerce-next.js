"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditModal({ product }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
    description: product?.description || "",
    category: product?.category?.name || "",
    brand: product?.brand?.name || "",
    imageCover: product?.imageCover || "",
  });

  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error updating product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-warning w-[49%]">
        Edit
      </button>
      {open && (
        <div className="fixed inset-0 z-999 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-100 flex flex-col gap-3"
          >
            <h2 className="text-lg font-semibold mb-2">Edit Product</h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="input input-bordered"
            />

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered"
            />

            <input
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="input input-bordered"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="input input-bordered"
            />

            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="input input-bordered"
            />

            <input
              name="imageCover"
              value={form.imageCover}
              onChange={handleChange}
              placeholder="Image URL"
              className="input input-bordered"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered"
            />

            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn w-1/2"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-warning w-1/2"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
