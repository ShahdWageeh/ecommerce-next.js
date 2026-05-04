import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/EditModal";
import Slider from "@/components/Swiper";
import { getProductById } from "@/lib/products";

async function Page({ params }) {
  const { prodId } = await params;
  const data = await getProductById(prodId);
  if (!data) {
    return <div className="p-6">Product not found or failed to load</div>;
  }
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Slider product={data}></Slider>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{data?.title}</h1>

            <p className="text-gray-500">{data?.category?.name}</p>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.round(data?.ratingsAverage) ? "⭐" : "☆"}
                </span>
              ))}
              <span className="text-sm text-gray-500 ml-1">
                ({data?.ratingsQuantity})
              </span>
            </div>

            <p className="text-xl font-semibold text-green-600">
              {data?.price} $
            </p>

            <p className="text-gray-600 leading-relaxed">{data?.description}</p>
            <div className="flex gap-4 mt-4">
              <EditModal product={data} />
              <DeleteModal productId={prodId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
