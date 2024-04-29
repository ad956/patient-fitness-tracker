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
    <div className="w-full px-2">
      {details.map((medicine, index) => (
        <div key={index} className="flex flex-row gap-2 p-2">
          <div className="bg-default textwhite p-2 rounded-xl h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-medicine-syrup"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 21h8a1 1 0 0 0 1 -1v-10a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v10a1 1 0 0 0 1 1z" />
              <path d="M10 14h4" />
              <path d="M12 12v4" />
              <path d="M10 7v-3a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3" />
            </svg>
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
