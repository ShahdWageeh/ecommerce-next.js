import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="text-center py-16 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Our Store</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide high-quality products with the best shopping experience.
          Our goal is to make your life easier with trusted and affordable
          items.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          width={500}
          height={300}
          alt=""
          className="rounded-2xl shadow-md"
          unoptimized
          loading="eager"
        />

        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to deliver the best products at the best prices while
            ensuring customer satisfaction. We believe in quality, trust, and
            innovation.
          </p>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold">10K+</h3>
            <p className="text-gray-500">Customers</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-gray-500">Products</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">4.8⭐</h3>
            <p className="text-gray-500">Rating</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">24/7</h3>
            <p className="text-gray-500">Support</p>
          </div>
        </div>
      </div>

      <div className="text-center py-6 text-gray-500 text-sm">
        © 2026 Your Store. All rights reserved.
      </div>
    </div>
  );
}
