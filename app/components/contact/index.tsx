import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Button, Card, Input } from "@nextui-org/react";

export default function ContactUS() {
  return (
    <section className="h-full flex flex-col items-center">
      <p className="text-4xl font-semibold">Get In Touch</p>
      <p className="text-sm text-gray-500">
        Reach out to us effortlessly through our contact form, and let us assist
        you with any inquiries or support needs you may have.
      </p>

      <Card
        isBlurred
        shadow="lg"
        className="flex flex-row justify-center items-center h-3/5 w-3/5 p-5"
      >
        <Card
          isBlurred
          shadow="lg"
          className="bg-[#32325d] text-white flex flex-col h-4/5 w-2/5"
        >
          <p className="text-xl font-semibold">Contact Information</p>
          <p className="text-sm font-semibold">
            Feel free to get in touch with us at any time for assistance,
            inquiries, or collaboration opportunities.
          </p>

          <div className="flex ">
            <IoIosCall />
            <div className="flex flex-col">
              <p className="text-xs">+917094566934</p>
              <p className="text-xs">+919457091234</p>
            </div>
          </div>
          <div className="flex ">
            <MdEmail />
            <p className="text-xs">support@patienthealthcare.com</p>
          </div>
          <div className="flex ">
            <FaLocationDot />
            <p className="text-xs">Gujarat,India</p>
          </div>
        </Card>
        <div className="flex flex-col h-4/5 w-3/5">
          <div className="flex justify-around">
            <Input
              isRequired
              type="text"
              label="Your Name"
              defaultValue="John Doe"
              className="max-w-xs"
            />
            <Input
              isRequired
              type="email"
              label="Your Email"
              defaultValue="johndoe@gmail.com"
              className="max-w-xs"
            />
          </div>
          <Input
            isRequired
            type="text"
            label="Your Subject"
            defaultValue="Here goes your subject"
            className="max-w-xs"
          />
          <Input
            isRequired
            type="text"
            label="Message"
            defaultValue="Write your message"
            className="max-w-xs"
          />

          <Button
            className="self-start font-bold text-white/90 bg-[#e95b7b]"
            variant="shadow"
            color="default"
            radius="lg"
            size="md"
          >
            Send Message
          </Button>
        </div>
      </Card>
    </section>
  );
}
