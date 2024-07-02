import { getPatientData } from "@lib/patient";
import { Patient } from "@types";
import { Card, Link, User } from "@nextui-org/react";
import { QRCode } from "../components";

export default async function QRCodePage() {
  const patient: Patient = await getPatientData();

  return (
    <Card
      shadow="lg"
      className="h-full flex flex-row justify-around items-center"
    >
      <div className="md:h-4/5 md:w-2/6 flex flex-col justify-center gap-5 items-center">
        <User
          name={patient.firstname}
          description={
            <Link size="sm" isExternal>
              @{patient.username}
            </Link>
          }
          avatarProps={{
            src: `${patient.profile}`,
          }}
        />

        <div className="flex flex-col justify-center items-center gap-2 px-5">
          <p className="text-sm font-semibold">
            Instant Access to Medical Records via QR Codes
          </p>
          <p className="text-xs">
            Empower patients with personalized QR codes, granting swift access
            to medical records for seamless interactions at hospitals.
          </p>
        </div>

        <QRCode text={patient.email} />
      </div>
    </Card>
  );
}
