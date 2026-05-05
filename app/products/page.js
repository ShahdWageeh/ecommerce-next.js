import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import AddBtn from "@/components/AddBtn";
export const dynamic = "force-dynamic";
async function Products() {
  const data = await getAllProducts();
  return (
    <>
      <div className="w-[90%] m-auto flex justify-between mt-3">
        <h2 className="text-3xl font-bold">PRODUCTS</h2>
        <AddBtn/>
      </div>
      <div className="w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8 gap-6 px-4">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
          >
            <div className="overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.title}
                width={300}
                height={200}
                className="w-full h-48 group-hover:scale-110 transition duration-300"
                loading="eager"
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold line-clamp-1">
                {product.title}
              </h3>

              <p className="text-sm text-gray-500">{product.category?.name}</p>

              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>
                    {i < Math.round(product.ratingsAverage) ? "⭐" : "☆"}
                  </span>
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.ratingsQuantity})
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>

              <Link href={`/products/${product._id}`}>
                <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
