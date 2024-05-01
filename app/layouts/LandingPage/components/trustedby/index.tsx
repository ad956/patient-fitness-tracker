"use client";

import { Image } from "@nextui-org/react";
import React, { useState } from "react";

interface Logo {
  src: string;
  alt: string;
}

export default function TrustedBy() {
  const [renderedLogos, setRenderedLogos] = useState<Logo[]>([]);

  const logos = [
    { src: "/brand-logos/apollo-hospitals.png", alt: "Apollo Hospitals" },
    { src: "/brand-logos/fortis.png", alt: "Fortis Healthcare" },
    { src: "/brand-logos/abbott.png", alt: "Abbott Laboratories" },
    { src: "/brand-logos/narayana-health.png", alt: "Narayana Health" },
    { src: "/brand-logos/sun-pharma.png", alt: "Sun Pharma" },
    { src: "/brand-logos/max-healthcare.png", alt: "Max Healthcare" },
  ];

  const duplicateLogos = () => {
    setRenderedLogos((prevLogos) => [...prevLogos, ...logos]);
  };

  React.useEffect(() => {
    duplicateLogos();
  }, [duplicateLogos]);

  return (
    <div className="w-3/4 flex flex-col gap-5">
      <p className="text-md text-black/75 font-medium">
        Healthcare institutions of all sizes rely on Patient Fitness Tracker to
        efficiently manage and securely deliver vital patient health data across
        their networks.
      </p>

      <div className="p-5 flex justify-center items-center">
        <div className="p-5 border-2 border-black/10 w-4/5 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {renderedLogos.map((logo, index) => (
              <li className="flex justify-center items-center" key={index}>
                <Image src={logo.src} height={150} width={100} alt={logo.alt} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
