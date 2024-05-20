import { Card, Avatar, Divider, Image } from "@nextui-org/react";

const testimonialData = [
  {
    id: 1,
    username: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    designation: "Patient , Apollo Hospitals",
    stars: 5,
    description:
      "The Patient Fitness Tracker has greatly improved my healthcare experience with its user-friendly interface and seamless appointment scheduling.",
  },
  {
    id: 2,
    username: "David Johnson",
    avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    designation: "Doctor , Max Healthcare",
    stars: 5,
    description:
      "The Patient Fitness Tracker revolutionized how we manage patient data, providing seamless integration and intuitive user interface.",
  },
  {
    id: 3,
    username: "Sarah Patel",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
    designation: "Doctor , Narayana Health",
    stars: 5,
    description:
      "With its innovative QR code feature, accessing patient records became effortless, enhancing efficiency and accuracy in healthcare delivery.",
  },
];

export default function Testimonial() {
  return (
    <section className="lg:h-3/5 flex flex-col items-center gap-5">
      <p className="text-2xl font-bold text-[#e95b7b]">Testimonial</p>
      <p className="lg:text-3xl font-semibold tracking-wide">
        See What Patients Are Saying About Us
      </p>

      <div className="lg:h-full flex flex-col lg:flex-row justify-center items-center lg:items-end gap-10 p-5">
        {testimonialData.map((item) => (
          <Card
            key={item.id}
            shadow="lg"
            className="overflow-visible relative lg:h-4/5 lg:w-[26%] flex flex-col justify-center gap-2 py-10 lg:p-2"
          >
            <Avatar
              src={item.avatar}
              size="lg"
              className="z-10 absolute -top-5 lg:-top-5 left-5"
            />
            <p className="text-md px-2 text-gray-700">{item.description}</p>
            <Divider className="w-4/5 bg-gray-200" />
            <div className="flex justify-around items-center">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-black">
                  {item.username}
                </p>
                <p className="text-xs text-gray-700">{item.designation}</p>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: item.stars }).map((_, index) => (
                  <Image
                    alt="rating-star-icon"
                    key={index}
                    src="icons/star-icon.svg"
                    height={20}
                    width={20}
                  />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
