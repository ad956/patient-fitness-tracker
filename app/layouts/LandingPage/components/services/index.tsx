"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

const services = [
  {
    key: "patient-record",
    title: "Record Management",
    description:
      "Efficiently manage patient records, including medical history, appointments, and treatment plans, ensuring accurate and up-to-date information is accessible to healthcare providers as needed.",
  },
  {
    key: "appointment",
    title: "Appointment",
    description:
      "Enable patients to schedule appointments online and receive reminders via email or SMS, reducing no-show rates and improving appointment adherence.",
  },
  {
    key: "health-monitoring",
    title: "Health Monitoring",
    description:
      "Integrate with wearable devices and health tracking apps to collect and analyze patient health data, providing insights to both patients and healthcare providers for proactive management of health conditions.",
  },
  {
    key: "telemedicine",
    title: "Telemedicine",
    description:
      "Offer virtual consultations and telemedicine services, allowing patients to consult with healthcare professionals remotely, reducing the need for in-person visits and improving accessibility to healthcare services.",
  },
  {
    key: "secure-communication",
    title: "Secure Communication",
    description:
      "Facilitate secure communication and collaboration among patients, healthcare providers, and administrative staff, ensuring confidentiality of patient information and improving coordination of care.",
  },
];

export default function ServicesOffered() {
  return (
    <section
      id="services"
      className="lg:h-4/6 flex flex-col lg:flex-row justify-around items-center my-10 lg:my-0"
    >
      <div className="flex flex-col lg:w-2/6 gap-3 p-5">
        <p className="text-xl font-bold text-[#e95b7b] tracking-wider">
          Services
        </p>
        <p className="text-3xl font-medium">
          We Cover A Big Variety Of Medical Services
        </p>

        <p className="text-sm text-gray-500">
          We provide the special tips and advice’s of heath care treatment and
          high level of best.
        </p>
      </div>

      <Card
        isBlurred
        shadow="lg"
        className="border-none bg-white/60 flex flex-wrap gap-5 lg:h-3/6 lg:w-3/6 w-5/6 lg:p-5"
      >
        <Tabs
          color="danger"
          aria-label="Tabs colors"
          radius="full"
          variant="underlined"
          isVertical={true}
          classNames={{
            tabList: "w-32 lg:w-auto",
          }}
        >
          {services.map((item) => (
            <Tab
              key={item.key}
              title={item.title}
              className="text-xs lg:text-sm px-5 py-2 lg:px-2 lg:py-0"
            >
              <div className="h-full grid place-items-center border-2 rounded-xl border-dashed border-rose-100">
                <p className="text-center">{item.description}</p>
              </div>
            </Tab>
          ))}
        </Tabs>
      </Card>
    </section>
  );
}
