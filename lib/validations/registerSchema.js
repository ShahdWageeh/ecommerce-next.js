import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    age: z
      .number({ invalid_type_error: "Age must be a number" })
      .min(18, "You must be at least 18 years old"),
    phone: z
      .string()
      .regex(
        /^(010|011|012|015)\d{8}$/,
        "Invalid, Egyptian phone numbers only",
      ),
    city: z.string().min(2, "City must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
