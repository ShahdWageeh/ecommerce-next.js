"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="lg:w-[50%] w-full mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <p className="text-center font-bold text-2xl">OR</p>
        <button type="button" className="lg:w-[70%] w-full mb-2 m-auto rounded-full flex items-center justify-center gap-2 bg-white text-black py-2 border border-gray-300 hover:bg-gray-100" onClick={()=> signIn("google", { callbackUrl: "/" })}>
            <Image width='100' height='100' src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" className="w-6 h-6 inline mr-2" />
            <span>Sign in with Google</span>
        </button>
        <button className="bg-black text-white py-2 rounded">Login</button>
        <p className="text-center">
          Don’t Have an account?{" "}
          <Link className="text-blue-600" href="/register">
            Register
          </Link>
        </p>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
