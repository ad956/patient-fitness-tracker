import { Image } from "@nextui-org/react";
import React from "react";

type MedicineDetailsProp = {
  details: [
    {
      name: string;
      dosage: string;
      frequency: string;
      start_date: string;
      end_date: string;
    }
  ];
};

export default function MedicineDetails({ details }: MedicineDetailsProp) {
  return (
    <div
      className={`flex flex-row flex-wrap px-2 ${
        details.length > 4 ? "overflow-y-scroll scrollbar" : ""
      }`}
    >
      {details.map((medicine, index) => (
        <div
          key={index}
          className="flex flex-row gap-2 p-2"
          style={{ width: "50%" }}
        >
          <div className="p-2 rounded-xl">
            <Image
              src={`/icons/${index % 3 === 0 ? "tablets.png" : "tablets2.png"}`}
              className="h-10"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="font-medium text-md">{medicine.name}</div>
            <div className="text-tiny">
              {medicine.dosage} {medicine.frequency}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
