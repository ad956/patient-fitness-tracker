import React from "react";
import { Card } from "@nextui-org/react";

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
    <div className="w-full px-2">
      {details.map((medicine, index) => (
        <Card key={index} className="mb-4 p-5">
          <div className="font-bold text-lg">{medicine.name}</div>
          <div>
            <div>
              <strong>Dosage:</strong> {medicine.dosage}
            </div>
            <div>
              <strong>Frequency:</strong> {medicine.frequency}
            </div>
            <div>
              <strong>Start Date:</strong> {medicine.start_date}
            </div>
            <div>
              <strong>End Date:</strong> {medicine.end_date}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
