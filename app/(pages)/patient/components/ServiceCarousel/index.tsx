"use client";

import React, { useEffect, useRef, useState } from "react";
import { Image } from "@nextui-org/react";

const images = ["/images/about-us.jpg", "/admin.png", "/hospital.png"];

export default function CarouselService() {
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

    const incrementImageIndex = () => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    };

    const id = setInterval(incrementImageIndex, 3000);

    return () => clearInterval(id);
  }, [images]);

  const handleClick = (index: number) => {
    clearInterval(intervalId); // Clear automatic sliding interval
    setCurrentImg(index);
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-full h-full rounded-md overflow-hidden relative">
        <div
          ref={carouselRef}
          style={{
            left: -currentImg * carouselSize.width,
          }}
          className="w-full h-full absolute flex transition-all duration-300"
        >
          {images.map((v, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              className="h-full w-full self-center relative shrink-0"
            >
              {/* <Image
                className="pointer-events-none"
                alt={`carousel-image-${i}`}
                src={v}
              /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
