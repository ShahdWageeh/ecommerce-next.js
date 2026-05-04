"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function AddProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    brand: "",
    imageCover: "",
    images: "",
    ratingsAverage: 0,
    ratingsQuantity: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        ratingsAverage: Number(formData.ratingsAverage),
        ratingsQuantity: Number(formData.ratingsQuantity),
        images: formData.images
          .split(",")
          .map((url) => url.trim())
          .filter((url) => url),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }

      setSuccess("Product created successfully!");
      setFormData({
        title: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
        brand: "",
        imageCover: "",
        images: "",
        ratingsAverage: 0,
        ratingsQuantity: 0,
      });
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (err) {
      setError(err.message || "Error creating product");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[70%] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Category name or ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brand name or ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Image Cover URL
          </label>
          <input
            type="url"
            name="imageCover"
            value={formData.imageCover}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Images (comma-separated URLs)
          </label>
          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Ratings Average
          </label>
          <input
            type="number"
            name="ratingsAverage"
            value={formData.ratingsAverage}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Ratings Quantity
          </label>
          <input
            type="number"
            name="ratingsQuantity"
            value={formData.ratingsQuantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}
    </div>
  );
}

export default AddProduct;
