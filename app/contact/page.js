"use client";

import toast from "react-hot-toast";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Message sent 🚀");
    setForm({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-black text-white p-8 flex flex-col justify-center gap-4">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-gray-300">
            Have a question or feedback? Fill out the form and we’ll get back to
            you.
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <p>📍 Cairo, Egypt</p>
            <p>📧 support@example.com</p>
            <p>📞 +20 123 456 789</p>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-semibold mb-4">Send Message</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <button
              type="submit"
              className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
