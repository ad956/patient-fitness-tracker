import { dbConfig, getFormattedDate } from "@utils/index";
import { bookingAppointment } from "@types";
import { decrypt } from "@sessions/sessionUtils";
import { Types } from "mongoose";
import sendEmail from "@lib/sendemail";
import { render } from "@react-email/render";
import { AppointmentBookedTemplate } from "@lib/emails/templates";
import sendNotification from "@lib/novu";
import { Patient, BookedAppointment, Doctor } from "@models/index";

type BookingAppointmentType = bookingAppointment & {
  transaction_id: string | null;
  appointment_charge: string;
};

// getting patients approved appointments
export async function GET(request: Request) {
  const session = request.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    await dbConfig();
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return new Response(JSON.stringify({ error: "Patient not found" }), {
        status: 404,
      });
    }

    let appointments = await BookedAppointment.find({
      patient_id: patient._id,
      approved: "approved",
    });

    const doctorIds = appointments.map((appointment) => appointment.doctor_id);

    const doctors = await Doctor.find(
      { _id: { $in: doctorIds } },
      { firstname: 1, lastname: 1, specialty: 1, profile: 1 }
    );

    const updatedAppointments = appointments.map((appointment) => {
      const appointmentObj = appointment.toObject();
      const doctor = doctors.find(
        (doc) => doc._id.toString() === appointmentObj.doctor_id.toString()
      );

      if (doctor) {
        appointmentObj.doctor = {
          name: `${doctor.firstname} ${doctor.lastname}`,
          profile: doctor.profile,
          specialty: doctor.specialty,
        };
      }
      return appointmentObj;
    });

    return new Response(JSON.stringify(updatedAppointments), {
      status: 200,
    });
  } catch (error) {
    console.error("Error getting appointments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// booking an appointment
export async function POST(req: Request) {
  const session = req.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      date,
      state,
      city,
      hospital,
      disease,
      note,
      transaction_id,
      appointment_charge,
    }: BookingAppointmentType = await req.json();

    const token = session.split("Bearer ")[1];
    const decryptedUser = await decrypt(token);
    const email = decryptedUser.user.email;

    await dbConfig();

    const patient = await Patient.findOne({ email });

    if (!patient) {
      return Response.json({ error: "Patient not found" }, { status: 404 });
    }
    console.log("=> " + hospital.hospital_id);

    const appointmentData = {
      date,
      state,
      city,
      hospital: {
        id: new Types.ObjectId(hospital.hospital_id),
        name: hospital.hospital_name,
      },
      disease,
      note,
      approved: "pending",
      patient_id: patient._id,
      doctor_id: null,
      receptionist_id: null,
    };

    const res = await BookedAppointment.create(appointmentData);

    if (!res)
      return Response.json({
        error: "Error saving appointment info",
      });

    const bookedAppointmentData = {
      date: getFormattedDate(new Date(date)),
      state,
      city,
      hospital,
      disease,
      note,
      transaction_id,
      appointment_charge,
    };

    // sending email to patient confirming request
    await sendEmail({
      to: email || "yourmail@example.com",
      subject: `Your Appointment Request Has Been Received`,
      html: render(
        AppointmentBookedTemplate({
          name: `${patient.firstname} ${patient.lastname}`,
          email,
          bookedAppointmentData,
          transaction_id,
          appointment_charge,
        })
      ),
      from: {
        name: "Patient Fitness Tracker",
        address: "support@patientfitnesstracker.com",
      },
    });

    // notifying patient
    await sendNotification(
      patient._id.toString(),
      "Your appointment request has been successfully received.",
      "appointment-request"
    );

    return Response.json(
      {
        msg: "Appointment request added successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding appointment request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
