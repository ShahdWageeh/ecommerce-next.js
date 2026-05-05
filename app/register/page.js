"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    setServerError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error);
        if (typeof result.error === "string") {
          toast.error(result.error);
        } else {
          Object.entries(result.error).forEach(([field, messages]) => {
            setError(field, {
              type: "server",
              message: messages[0],
            });
          });
        }
        return;
      }
      toast.success("Account created successfully 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lg:w-[50%] md:w-[70%] w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label className="block text-sm font-medium mb-2">Username</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          {...register("username")}
        />
        <p className="text-red-500">{errors.username?.message}</p>

        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          {...register("email")}
        />
        <p className="text-red-500">{errors.email?.message}</p>

        <label className="block text-sm font-medium mb-2">Age</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Age"
          {...register("age")}
        />
        <p className="text-red-500">{errors.age?.message}</p>

        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Phone"
          {...register("phone")}
        />
        <p className="text-red-500">{errors.phone?.message}</p>

        <label className="block text-sm font-medium mb-2">City</label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="City"
          {...register("city")}
        />
        <p className="text-red-500">{errors.city?.message}</p>

        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          {...register("password")}
        />
        <p className="text-red-500">{errors.password?.message}</p>

        <label className="block text-sm font-medium mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        />
        <p className="text-red-500">{errors.confirmPassword?.message}</p>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="text-center">
          Already Have an account?{" "}
          <Link className="text-blue-600" href="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
