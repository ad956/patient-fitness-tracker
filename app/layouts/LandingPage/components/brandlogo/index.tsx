import Image from "next/image";

export const BrandLogo = () => (
  <div className="flex items-center gap-2">
    <Image src="/patient.svg" height="40" width="40" alt="brand-logo" />
    <h2 className="text-xl font-extrabold">Patient Fitness Tracker</h2>
  </div>
);
