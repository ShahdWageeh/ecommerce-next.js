import { connectDB } from "@/lib/mongodb";
import { getAllProducts } from "@/lib/products";

export async function GET() {
  const formatted = await getAllProducts();
  return Response.json(formatted, { status: 200 });
}

export async function POST(req) {
  const db = await connectDB();
  const body = await req.json();
  const newProduct = {
    ...body,
    createdAt: new Date(),
  };
  const result = await db.collection("products").insertOne(newProduct);
  return Response.json(
    {
      message: "Product created",
      productId: result.insertedId.toString(),
    },
    { status: 201 },
  );
}









