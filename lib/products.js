import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/mongodb";


export async function getAllProducts() {
  const db = await connectDB();
  const products = await db.collection("products").find().toArray();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}

export async function getProductById(prodId) {
  if (!prodId || !ObjectId.isValid(prodId)) {
    return null;
  }
  const db = await connectDB();
  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(prodId) });
  if (!product) return null;
  return { ...product, _id: product._id.toString() };
}
