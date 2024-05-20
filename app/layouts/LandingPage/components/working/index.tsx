import { Card } from "@nextui-org/react";
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
} from "react-icons/tb";

export default function WorkingProcess() {
  return (
    <section className="lg:h-3/5 flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl font-bold text-[#e95b7b]">Working Process</p>
        <p className="text-3xl font-bold">How we works?</p>
      </div>

      <div className="lg:h-full lg:w-4/5 flex flex-col lg:flex-row justify-around items-center gap-5 mx-5 lg:mx-0">
        <Card
          radius="md"
          isBlurred
          shadow="lg"
          className="flex flex-col justify-around p-5 lg:h-5/6 lg:w-2/5"
        >
          <TbHexagonNumber1 size={50} color="#e95b7b" />

          <div className="">
            <p className="text-xl font-semibold">Registration</p>
            <p className="text-md my-3">
              Patient can do registration from here with basic information.
            </p>
          </div>
        </Card>
        <Card
          radius="md"
          isBlurred
          shadow="lg"
          className="flex flex-col justify-around p-5 lg:h-5/6 lg:w-2/5"
        >
          <TbHexagonNumber2 size={50} color="#e95b7b" />
          <div className="">
            <p className="text-xl font-semibold">Make Appointment</p>
            <p className="text-md my-3">
              Patient can book an appointment with doctor from landing page or
              from his login panel.
            </p>
          </div>
        </Card>
        <Card
          radius="md"
          isBlurred
          shadow="lg"
          className="flex flex-col justify-around p-5 lg:h-5/6 lg:w-2/5"
        >
          <TbHexagonNumber3 size={50} color="#e95b7b" />
          <div className="">
            <p className="text-xl font-semibold">Take Treatment</p>
            <p className="text-md my-3">
              Doctors can interact with patients and do related treatment.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
