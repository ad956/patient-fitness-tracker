"use client";

// export default function Reports() {
//   return (
//     <div>
//       Extract Reports for specific hospital which will shows its total usre s,
//       doctors , receps, etc
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Select,
  SelectItem,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface Hospital {
  id: number;
  name: string;
  totalUsers: number;
  doctors: number;
  nurses: number;
  receptionists: number;
  patients: number;
  beds: number;
  occupancyRate: number;
}

const initialHospitals: Hospital[] = [
  {
    id: 1,
    name: "Central Hospital",
    totalUsers: 500,
    doctors: 50,
    nurses: 150,
    receptionists: 20,
    patients: 280,
    beds: 300,
    occupancyRate: 85,
  },
  {
    id: 2,
    name: "City General Hospital",
    totalUsers: 750,
    doctors: 80,
    nurses: 220,
    receptionists: 30,
    patients: 420,
    beds: 450,
    occupancyRate: 92,
  },
  {
    id: 3,
    name: "Community Health Center",
    totalUsers: 300,
    doctors: 30,
    nurses: 90,
    receptionists: 15,
    patients: 165,
    beds: 180,
    occupancyRate: 78,
  },
];

const Reports: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [compareHospital, setCompareHospital] = useState<Hospital | null>(null);
  const [isAddHospitalOpen, setIsAddHospitalOpen] = useState<boolean>(false);
  const [newHospital, setNewHospital] = useState<Omit<Hospital, "id">>({
    name: "",
    totalUsers: 0,
    doctors: 0,
    nurses: 0,
    receptionists: 0,
    patients: 0,
    beds: 0,
    occupancyRate: 0,
  });

  const renderHospitalData = (hospital: Hospital) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(hospital).map(([key, value]) => {
        if (key !== "id" && key !== "name") {
          return (
            <Card key={key}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{key}</p>
                <h4 className="font-bold text-large">{value}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Divider />
              </CardBody>
            </Card>
          );
        }
        return null;
      })}
    </div>
  );

  const handleAddHospital = () => {
    const id = Math.max(...hospitals.map((h) => h.id)) + 1;
    setHospitals([...hospitals, { ...newHospital, id }]);
    setIsAddHospitalOpen(false);
    setNewHospital({
      name: "",
      totalUsers: 0,
      doctors: 0,
      nurses: 0,
      receptionists: 0,
      patients: 0,
      beds: 0,
      occupancyRate: 0,
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Hospital Reports Dashboard</h1>

      <div className="mb-6 flex gap-4">
        <Select
          label="Select a hospital"
          onChange={(e) => {
            const selected = hospitals.find(
              (h) => h.id === parseInt(e.target.value)
            );
            if (selected) setSelectedHospital(selected);
          }}
        >
          {hospitals.map((hospital) => (
            <SelectItem key={hospital.id} value={hospital.id.toString()}>
              {hospital.name}
            </SelectItem>
          ))}
        </Select>
        <Button
          onPress={() => setIsAddHospitalOpen(true)}
          size="sm"
          variant="light"
          className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-full px-4 py-1 transition-colors duration-200"
        >
          Add New Hospital
        </Button>
      </div>

      {selectedHospital && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {selectedHospital.name} Report
          </h2>
          {renderHospitalData(selectedHospital)}
        </>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Compare Hospitals</h2>
        <div className="flex gap-4 mb-4">
          <Select
            label="Select another hospital to compare"
            onChange={(e) => {
              const selected = hospitals.find(
                (h) => h.id === parseInt(e.target.value)
              );
              if (selected) setCompareHospital(selected);
            }}
          >
            {hospitals
              .filter((h) => h.id !== selectedHospital?.id)
              .map((hospital) => (
                <SelectItem key={hospital.id} value={hospital.id.toString()}>
                  {hospital.name}
                </SelectItem>
              ))}
          </Select>
          <Button
            onPress={() => setCompareHospital(null)}
            isDisabled={!compareHospital}
            variant="light"
            className="bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-full px-4 py-1 transition-colors duration-200"
          >
            Clear Comparison
          </Button>
        </div>

        {selectedHospital && compareHospital && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">
                {selectedHospital.name}
              </h3>
              {renderHospitalData(selectedHospital)}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{compareHospital.name}</h3>
              {renderHospitalData(compareHospital)}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">All Hospitals Overview</h2>
        <Table aria-label="Hospitals overview table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Total Users</TableColumn>
            <TableColumn>Doctors</TableColumn>
            <TableColumn>Nurses</TableColumn>
            <TableColumn>Patients</TableColumn>
            <TableColumn>Occupancy Rate</TableColumn>
          </TableHeader>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>{hospital.name}</TableCell>
                <TableCell>{hospital.totalUsers}</TableCell>
                <TableCell>{hospital.doctors}</TableCell>
                <TableCell>{hospital.nurses}</TableCell>
                <TableCell>{hospital.patients}</TableCell>
                <TableCell>{hospital.occupancyRate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isAddHospitalOpen}
        onOpenChange={setIsAddHospitalOpen}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Add New Hospital
          </ModalHeader>
          <ModalBody>
            <Input
              label="Hospital Name"
              value={newHospital.name}
              onChange={(e) =>
                setNewHospital({ ...newHospital, name: e.target.value })
              }
            />
            <Input
              label="Total Users"
              type="number"
              value={newHospital.totalUsers.toString()}
              onChange={(e) =>
                setNewHospital({
                  ...newHospital,
                  totalUsers: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              label="Doctors"
              type="number"
              value={newHospital.doctors.toString()}
              onChange={(e) =>
                setNewHospital({
                  ...newHospital,
                  doctors: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              label="Nurses"
              type="number"
              value={newHospital.nurses.toString()}
              onChange={(e) =>
                setNewHospital({
                  ...newHospital,
                  nurses: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              label="Receptionists"
              type="number"
              value={newHospital.receptionists.toString()}
              onChange={(e) =>
                setNewHospital({
                  ...newHospital,
                  receptionists: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              label="Patients"
              type="number"
              value={newHospital.patients.toString()}
              onChange={(e) =>
                setNewHospital({
                  ...newHospital,
                  patients: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              label="Beds"
              type="number"
              value={newHospital.beds.toString()}
              onChange={(e) =>
                setNewHospital({
                  ...newHospital,
                  beds: parseInt(e.target.value) || 0,
                })
              }
            />
            <Input
              label="Occupancy Rate"
              type="number"
              value={newHospital.occupancyRate.toString()}
              onChange={(e) =>
                setNewHospital({
                  ...newHospital,
                  occupancyRate: parseFloat(e.target.value) || 0,
                })
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setIsAddHospitalOpen(false)}
            >
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddHospital}>
              Add Hospital
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Reports;
