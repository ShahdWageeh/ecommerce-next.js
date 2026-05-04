import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/validations/registerSchema";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse({
      ...body,
      age: Number(body.age),
    });
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const { username, email, age, phone, city, password } = parsed.data;
    const db = await connectDB();
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
    const result = await db.collection("users").insertOne({
      username,
      email,
      age,
      phone,
      city,
      password: hashedPassword,
      createdAt: new Date(),
    });
    return Response.json(
      {
        message: "User registered successfully",
        userId: result.insertedId.toString(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      { error: "Internal Server Errorrrr" },
      { status: 500 },
    );
  }
}
