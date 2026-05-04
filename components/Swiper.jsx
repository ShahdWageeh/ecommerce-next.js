"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
export default function Slider({ product }) {
  return (
    <>
      <div>
        <Swiper
          spaceBetween={10}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {product?.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                width={300}
                height={300}
                alt=""
                className="w-full h-80  rounded-2xl"
                loading="eager"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </>
  );
}
