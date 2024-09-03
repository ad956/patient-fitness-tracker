import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import React from "react";
import { RiCactusLine, RiCheckLine } from "react-icons/ri";

const HospitalApprovalList = ({ hospitals }: any) => {
  return (
    <Card className="h-[400px]">
      <CardHeader className="border-b border-gray-200 p-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          New Hospital Accounts
        </h3>
      </CardHeader>
      <CardBody className="p-6 overflow-y-auto scrollbar">
        <ul className="divide-y divide-gray-200">
          {hospitals.map((hospital: any) => (
            <li
              key={hospital.id}
              className="py-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{hospital.name}</p>
                <p className="text-sm text-gray-500">{hospital.email}</p>
              </div>
              <div>
                <Button
                  variant="solid"
                  color="success"
                  className="px-4 py-2 rounded-lg mr-2 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                  // onClick={() => onApproval(hospital.id, true)}
                  aria-label="Approve hospital"
                  startContent={<RiCheckLine className="h-5 w-5" />}
                >
                  Approve
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  className="px-4 py-2 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                  // onClick={() => onApproval(hospital.id, false)}
                  aria-label="Disapprove hospital"
                  startContent={<RiCactusLine className="h-5 w-5" />}
                >
                  Disapprove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default HospitalApprovalList;
