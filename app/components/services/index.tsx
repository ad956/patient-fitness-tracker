"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

export default function ServicesOffered() {
  return (
    <section className="h-5/6 flex justify-around items-center">
      <div className="flex flex-col ">
        <p className="text-lg text-[#e95b7b] tracking-wider">Services</p>
        <p className="text-3xl">We Cover A Big Variety Of Medical Services</p>

        <p className="text-sm text-gray-500">
          We provide the special tips and advice’s of heath care treatment and
          high level of best.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Tabs key="1" aria-label="Tabs colors" radius="full">
          <Tab key="patient-record" title="Record Management">
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="appointment" title="Appointment">
            <Card>
              <CardBody>
                22 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>

          <Tab key="health-monitoring" title="Health Monitoring">
            <Card>
              <CardBody>
                333 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>

          <Tab key="telemedicine" title="Telemedicine">
            <Card>
              <CardBody>
                4444 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>

          <Tab key="secure-communication" title="Secure Communication">
            <Card>
              <CardBody>
                55555 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
