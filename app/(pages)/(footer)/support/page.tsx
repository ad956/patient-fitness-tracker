"use client";

import { Accordion, AccordionItem, Image } from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa6";
import { FcBusinessContact, FcDocument, FcFaq } from "react-icons/fc";

export default function Support() {
  return (
    <section className="h-full flex	justify-around items-center">
      <div className="w-4/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Support</h2>
          <p className="text-lg mb-4">
            Discover our extensive support resources tailored to meet the
            diverse needs of our users, ensuring seamless navigation and
            assistance throughout your healthcare journey.
          </p>
          <Accordion variant="bordered" className="">
            {supportDetails.map((item, index) => (
              <AccordionItem
                key={item.title}
                startContent={setAccordionIcon(index)}
                title={item.title}
              >
                <p className="text-md text-black/90 ml-2">{item.desc}</p>

                {index === 1 ? (
                  <FAQ />
                ) : index === 2 ? (
                  <Documentation />
                ) : (
                  <></>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

const supportDetails = [
  {
    title: "Contact Us",
    desc: "Our dedicated support team is available to assist you with any questions, concerns, or inquiries you may have. Contact us via email at support@patienthealthcare.com or phone at +91-709-456-6934 during our business hours (Monday to Friday, 9 AM to 5 PM IST). You can also reach out to us through our online contact form, and we'll get back to you as soon as possible to provide the support you need.",
  },
  {
    title: "FAQs",
    desc: "Explore our frequently asked questions (FAQs) section to find answers to common queries about our platform, services, and features. Our comprehensive FAQ database covers topics such as account setup, billing, troubleshooting, and more. If you don't find what you're looking for, feel free to reach out to our support team for further assistance.",
  },
  {
    title: "Documentation",
    desc: "Access our comprehensive documentation to learn more about using our platform, configuring settings, and troubleshooting common issues. Our documentation includes detailed user guides, tutorials, API documentation, and troubleshooting resources to help you make the most out of our solutions. Whether you're a beginner or an advanced user, our documentation provides valuable insights and resources to enhance your experience.",
  },
];

function setAccordionIcon(index: number) {
  switch (index) {
    case 0:
      return <FcBusinessContact size={20} />;
    case 1:
      return <FcFaq size={20} />;
    case 2:
      return <FcDocument size={20} />;
  }
}

function FAQ() {
  return (
    <Accordion variant="light" className="">
      <AccordionItem
        startContent={<FaAngleDown />}
        title="How do I create an account?"
      >
        <p className="text-md text-black/90 ml-2">
          To create an account, simply click on the &apos;Sign Up&apos; button
          located on the top right corner of the website. Fill out the required
          information such as your name, email address, and password, and then
          click &apos;Create Account&apos;. You will receive a confirmation
          email to verify your account, and once verified, you can log in to
          access your account dashboard.
        </p>
      </AccordionItem>

      <AccordionItem
        startContent={<FaAngleDown />}
        title="What services do you offer?"
      >
        <p className="text-md text-black/90 ml-2">
          We offer a range of services including patient management, appointment
          scheduling, health monitoring, and secure communication. Our platform
          is designed to streamline healthcare processes, improve patient care,
          and enhance communication between patients and healthcare providers.
        </p>
      </AccordionItem>

      <AccordionItem
        startContent={<FaAngleDown />}
        title="How do I schedule an appointment?"
      >
        <p className="text-md text-black/90 ml-2">
          Scheduling an appointment is easy! Simply log in to your account,
          navigate to the &apos;Appointments&apos; section, and click on the
          &apos;Schedule Appointment&apos; button. Choose your preferred date
          and time, select the healthcare provider you wish to see, and confirm
          your appointment. You will receive a confirmation email with all the
          details of your appointment.
        </p>
      </AccordionItem>
    </Accordion>
  );
}
function Documentation() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="https://i.pinimg.com/originals/c0/34/17/c03417ebf4f447610528b07a704e0540.gif"
        height={200}
        width={200}
        alt="docu"
      />

      <p className="text-2xl font-bold">
        Documentation will be available soon ...
      </p>
    </div>
  );
}
