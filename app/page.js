import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";

/** ISR: refresh product list every 12 hours */
export const revalidate = 43200;

export default async function HomePage() {
  const products = await getAllProducts();

  const featured = products.slice(0, 4);
  const latest = products.slice(-6);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center text-center py-20 bg-gray-50">
        <h2 className="text-4xl font-bold mb-4">Discover Amazing Products</h2>
        <p className="text-gray-600 mb-6">
          Best quality products at the best prices
        </p>
        <Link
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </section>

      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featured?.map((product) => (
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

                <p className="text-sm text-gray-500">
                  {product.category?.name}
                </p>

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
      </section>

      <section className="bg-black text-white py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-8">Why Us</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold">🚚 Fast Delivery</h3>
            <p className="text-gray-300">Get your order quickly anywhere</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">🔒 Secure Payment</h3>
            <p className="text-gray-300">100% safe transactions</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold">💰 Best Prices</h3>
            <p className="text-gray-300">Affordable products for everyone</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {latest.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden hover:scale-105 transition"
            >
              <Image
                src={product.imageCover}
                alt={product.title}
                width={200}
                height={150}
                className="w-full h-32"
              />
              <div className="p-2">
                <p className="text-sm font-medium line-clamp-1">
                  {product.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
