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
  const [intervalId, setIntervalId] = useState(null);

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
    const id = setInterval(incrementImageIndex, 3000); // Adjust timing as needed

    // Clear interval on unmount
    return () => clearInterval(id);
  }, [data.length]);

  // const handlePrevClick = () => {
  //   clearInterval(intervalId); // Clear automatic sliding interval
  //   setCurrentImg((prev) => prev - 1);
  // };

  // const handleNextClick = () => {
  //   clearInterval(intervalId); // Clear automatic sliding interval
  //   setCurrentImg((prev) => (prev + 1) % data.length);
  // };

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

              <div className="absolute bottom-0 flex flex-col items-center w-full p-2">
                <p className="text-2xl text-white">{v.title}</p>
                <p className="text-lg text-white">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center mt-3">
        <button
          disabled={currentImg === 0}
          // onClick={handlePrevClick}
          className={`border px-4 py-2 font-bold ${
            currentImg === 0 && "opacity-50"
          }`}
        ></button>
        <button
          disabled={currentImg === data.length - 1}
          // onClick={handleNextClick}
          className={`border px-4 py-2 font-bold ${
            currentImg === data.length - 1 && "opacity-50"
          }`}
        ></button>
        <button
          disabled={currentImg === data.length - 2}
          // onClick={handleNextClick}
          className={`border px-4 py-2 font-bold ${
            currentImg === data.length - 1 && "opacity-50"
          }`}
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
