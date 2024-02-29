"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const Carousel = ({
  data,
}: {
  data: {
    image: string;
    title: string;
    desc: string;
  }[];
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [carouselSize, setCarouselSize] = useState({ width: 0, height: 0 });
  const carouselRef = useRef(null);
  const [intervalId, setIntervalId] = useState("");

  useEffect(() => {
    let elem = carouselRef.current as unknown as HTMLDivElement;
    let { width, height } = elem.getBoundingClientRect();
    if (carouselRef.current) {
      setCarouselSize({
        width,
        height,
      });
    }

    // Function to increment image index
    const incrementImageIndex = () => {
      setCurrentImg((prev) => (prev + 1) % data.length);
    };

    // Set interval for automatic sliding
    const id = setInterval(incrementImageIndex, 3000);

    // Clear interval on unmount
    return () => clearInterval(id);
  }, [data.length]);

  const handleClick = (index: number) => {
    clearInterval(intervalId); // Clear automatic sliding interval
    setCurrentImg(index);
  };

  return (
    <div className="flex flex-col justify-evenly p-4 h-full w-full">
      {/* Carousel container */}
      <div className="h-full rounded-md overflow-hidden relative">
        {/* Image container */}
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="w-full h-full absolute flex transition-all duration-300"
        >
          {data.map((v, i) => (
            <div
              key={i}
              className="h-full w-full self-center relative shrink-0"
            >
              <Image
                className="pointer-events-none"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 150vw"
                alt={`carousel-image-${i}`}
                src={v.image}
              />

              <div className="absolute bottom-0 flex flex-col items-center w-full p-2 bg-gray-900 bg-opacity-75">
                <p className="text-lg text-white font-bold mb-1">{v.title}</p>
                <p className="text-sm text-gray-200">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="self-center flex gap-2 justify-center mt-3 bg-[#2d2b2b] rounded-full w-20 p-1">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-2 h-2 bg-gray-500 rounded-full mx-1 focus:outline-none opacity-50 ${
              currentImg === index ? "bg-[#73f9bb]" : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
