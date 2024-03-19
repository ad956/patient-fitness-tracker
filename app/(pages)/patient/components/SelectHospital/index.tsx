"use client";

import { states } from "@/app/utils/constants";
import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { CiHospital1 } from "react-icons/ci";
import { LiaCitySolid } from "react-icons/lia";
import { MdLocationCity } from "react-icons/md";

export default function SelectHosiptal() {
  const [state, setState] = useState("");

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  return (
    <div className="flex flex-row items-center gap-5">
      <Select
        isRequired
        startContent={<LiaCitySolid />}
        label="Select State"
        placeholder="Select your state"
        className="max-w-xs"
        variant="bordered"
        scrollShadowProps={{
          isEnabled: true,
        }}
        value={state}
        onChange={handleStateChange}
      >
        {states.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        startContent={<MdLocationCity />}
        label="Select City"
        placeholder="Select your city"
        className="max-w-xs"
        variant="bordered"
        scrollShadowProps={{
          isEnabled: true,
        }}
      >
        {HospitalCities.map((item) => (
          <SelectItem key={item.city} value={item.city}>
            {item.city}
          </SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        startContent={<CiHospital1 />}
        label="Select Hospital"
        placeholder="Select your preferred hospital"
        className="max-w-xs"
        variant="bordered"
        scrollShadowProps={{
          isEnabled: true,
        }}
      >
        {HospitalCities.map((item) => (
          <SelectItem key={item.hospital} value={item.hospital} color="warning">
            {item.hospital}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

const HospitalCities = [
  {
    city: "Vadodara",
    hospital: "Appllo",
  },
  {
    city: "Vadodara",
    hospital: "Appllo",
  },
  {
    city: "Ahmedabad",
    hospital: "Fortis",
  },
  {
    city: "Ahmedabad",
    hospital: "Sterling",
  },
  {
    city: "Surat",
    hospital: "City Hospital",
  },
  {
    city: "Surat",
    hospital: "Kiran Hospital",
  },
  {
    city: "Rajkot",
    hospital: "Krishna Hospital",
  },
  {
    city: "Rajkot",
    hospital: "Apollo",
  },
  {
    city: "Gandhinagar",
    hospital: "Civil Hospital",
  },
  {
    city: "Gandhinagar",
    hospital: "Aditya Birla Hospital",
  },
];
