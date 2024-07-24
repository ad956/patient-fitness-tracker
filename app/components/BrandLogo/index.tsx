import Image from "next/image";

const BrandLogo = () => (
  <div className="flex items-center gap-2">
    <Image src="/icons/patient.svg" height="40" width="40" alt="brand-logo" />
    <h2 className="text-xl font-extrabold">Patient Fitness Tracker</h2>
  </div>
);

export default BrandLogo;
