import { Patient, Receptionist, Doctor, Hospital, Admin } from "@models/index";

export default function getModelByRole(role: string) {
  switch (role) {
    case "patient":
      return Patient;
    case "receptionist":
      return Receptionist;
    case "doctor":
      return Doctor;
    case "hospital":
      return Hospital;
    case "admin":
      return Admin;
    default:
      throw new Error(`Invalid role: ${role}`);
  }
}
