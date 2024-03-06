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
    { src: "apollo-hospitals-logo.png", alt: "Apollo Hospitals" },
    { src: "fortis.png", alt: "Fortis Healthcare" },
    { src: "abbott.png", alt: "Abbott Laboratories" },
    { src: "narayana-health-logo.png", alt: "Narayana Health" },
    { src: "sun-pharma.png", alt: "Sun Pharma" },
    { src: "Max-Healthcare-Logo.png", alt: "Max Healthcare" },
  ];

  const duplicateLogos = () => {
    setRenderedLogos([...renderedLogos, ...logos]);
  };

  React.useEffect(() => {
    duplicateLogos();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg text-black/75 font-medium">
        Healthcare institutions of all sizes rely on Patient Fitness Tracker to
        efficiently manage and securely deliver vital patient health data across
        their networks.
      </p>

      <div className="flex justify-center items-center">
        <div className="border-2 border-green-700 w-4/5 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
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
