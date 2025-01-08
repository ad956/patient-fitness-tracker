import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Avatar,
} from "@nextui-org/react";
import { LuCalendarClock } from "react-icons/lu";
import { getFormattedDate } from "@utils/get-date";

const AppointmentDetailsModal = ({
  isOpen,
  onOpenChange,
  appointmentDetail,
}: any) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1 font-bold">
            <p className="text-danger mx-2"> Appointment Details</p>
          </ModalHeader>
          <ModalBody className="flex flex-col items-start">
            <div className="flex flex-row w-full p-2 justify-around items-center ">
              <Avatar
                src={appointmentDetail?.doctor.profile}
                className="w-28 h-28 text-large"
              />
              <div className="flex flex-col justify-center items-start">
                <div className="mb-2">
                  <p className="font-bold text-xl">
                    {appointmentDetail?.doctor.name}
                  </p>
                  <p className="font-bold text-black/80 text-sm">
                    {appointmentDetail?.doctor.specialty}
                  </p>
                </div>

                <div className="flex flex-row justify-center items-center gap-2">
                  <LuCalendarClock size={25} className="text-warning" />
                  <p className="font-bold text-black/80 text-md">
                    {appointmentDetail &&
                      getFormattedDate(new Date(appointmentDetail.createdAt))}
                  </p>
                </div>
                <p className="font-bold text-black/70 text-sm">
                  {appointmentDetail?.timing.startTime}
                  <span className="px-5">-</span>
                  {appointmentDetail?.timing.endTime}
                </p>
              </div>
            </div>
            <table className="border-collapse w-full ">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="font-bold pr-4 py-2">Disease</td>
                  <td className="py-2">{appointmentDetail?.disease}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="font-bold pr-4 py-2">Hospital</td>
                  <td className="py-2">{appointmentDetail?.hospital.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="font-bold pr-4 py-2">Note</td>
                  <td className="py-2">{appointmentDetail?.note}</td>
                </tr>
                <tr>
                  <td className="font-bold pr-4 py-2">City</td>
                  <td className="py-2">{appointmentDetail?.city}</td>
                </tr>
              </tbody>
            </table>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentDetailsModal;
