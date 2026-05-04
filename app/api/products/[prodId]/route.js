import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getProductById } from "@/lib/products";

export async function GET(request, { params }) {
  const { prodId } = await params;
  const product = await getProductById(prodId);
  if (!product) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json(product);
}

export async function DELETE(req, { params }) {
  const { prodId } = await params;
  const db = await connectDB();
  const result = await db
    .collection("products")
    .deleteOne({ _id: new ObjectId(prodId) });
  if (result.deletedCount === 0) {
    return Response.json({ message: "Product not found" }, { status: 404 });
  }
  return Response.json({ message: "Product deleted successfully" });
}

export async function PUT(request, { params }) {
  const { prodId } = await params;
  const body = await request.json();
  const db = await connectDB();
  const result = await db.collection("products").updateOne(
    { _id: new ObjectId(prodId) },
    {
      $set: {
        title: body.title,
        price: Number(body.price),
        quantity: Number(body.quantity),
        description: body.description,
        category: { name: body.category },
        brand: { name: body.brand },
        imageCover: body.imageCover,
        updatedAt: new Date(),
      },
    },
  );
  
  return Response.json({ message: "Updated" });
}
