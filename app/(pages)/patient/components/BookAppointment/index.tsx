"use client";

declare global {
  interface Window {
    Razorpay: any;
  }
}

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { bookAppointment, pendingAppointmentsRequest } from "@lib/patient";
import toast, { Toaster } from "react-hot-toast";
import {
  getCities,
  getDiseases,
  getHospitals,
  getStates,
} from "@lib/patient/misc";

type Hospital = {
  hospital_id: string;
  hospital_name: string;
  appointment_charge: string;
};

type BookAppointmentProps = {
  name: string;
  email: string;
};

export default function BookAppointment({ name, email }: BookAppointmentProps) {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<Hospital>({
    hospital_id: "",
    hospital_name: "",
    appointment_charge: "",
  });
  const [selectedDisease, setSelectedDisease] = useState("");
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [loadingDiseases, setLoadingDiseases] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenHospitalPopover, setIsOpenHospitalPopover] = useState(false);
  const [isOpenDiseasePopover, setIsOpenDiseasePopover] = useState(false);
  const [hospitals, setHospitals] = useState<
    { hospital_id: string; hospital_name: string; appointment_charge: string }[]
  >([]);
  const [diseases, setDiseases] = useState<string[]>([]);
  const [additionalNote, setAdditionalNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedCity("");
    setIsOpenPopover(false);
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setIsOpenPopover(false);
  };

  useEffect(() => {
    setLoadingStates(true);
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);
      fetchCities();
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      setLoadingHospitals(true);
      fetchHospitals();
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedHospital) {
      setLoadingDiseases(true);
      fetchDiseases();
    }
  }, [selectedHospital]);

  const fetchStates = async () => {
    try {
      const statesData = await getStates();
      setStates(statesData);
    } catch (error: any) {
      console.error("Error fetching states :", error);
      toast.error(error.message);
    } finally {
      setLoadingStates(false);
    }
  };
  const fetchCities = async () => {
    try {
      const citiesData = await getCities(selectedState);
      setCities(citiesData);
    } catch (error: any) {
      console.error("Error fetching cities:", error);
      toast.error(error.message);
    } finally {
      setLoadingCities(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const hospitalsData = await getHospitals(selectedState, selectedCity);

      setHospitals(hospitalsData);
    } catch (error: any) {
      console.error("Error fetching hospitals:", error);
      toast.error(error.message);
    } finally {
      setLoadingHospitals(false);
    }
  };

  const fetchDiseases = async () => {
    try {
      const diseasesData = await getDiseases();
      setDiseases(diseasesData);
    } catch (error: any) {
      console.error("Error fetching diseases:", error);
      toast.error(error.message);
    } finally {
      setLoadingDiseases(false);
    }
  };

  const handleAdditionalNoteChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value;
    setAdditionalNote(value);
    if (value.length < 10 || value.length > 50) {
      setNoteError("The description should be 10-50 characters long.");
    } else {
      setNoteError("");
    }
  };

  function handleHospitalChange(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedId = e.target.value;

    const selectedHospitalObj: Hospital | undefined = hospitals.find(
      (hospital) => hospital.hospital_id === selectedId
    );

    if (selectedHospitalObj) {
      setSelectedHospital({
        hospital_id: selectedId,
        hospital_name: selectedHospitalObj.hospital_name,
        appointment_charge: selectedHospitalObj.appointment_charge,
      });
    }
    setIsOpenHospitalPopover(false);
  }

  function handleDiseaseChange(e: ChangeEvent<HTMLSelectElement>): void {
    setSelectedDisease(e.target.value);
    setIsOpenDiseasePopover(false);
  }

  async function handleAppointmentButtonClick(): Promise<void> {
    toast.loading("Please wait");

    // checks for existing pending appointment request
    const result = await pendingAppointmentsRequest(
      selectedHospital.hospital_id
    );

    if (result.hasPendingAppointment) {
      toast.dismiss();
      toast.error("You already have a pending appointment request");
      return;
    }

    toast.dismiss();
    // razorpay payment processing
    const paymentResult = await processPayment(
      selectedHospital.appointment_charge,
      name,
      email
    );

    if (!paymentResult.success) {
      toast.error(paymentResult.message, {
        duration: 3000,
        position: "bottom-center",
      });
      return;
    }

    // booking appointment after payment
    const bookAppointmentData = {
      date: new Date(),
      state: selectedState,
      city: selectedCity,
      hospital: selectedHospital,
      disease: selectedDisease,
      note: additionalNote,
    };

    const response = await bookAppointment(bookAppointmentData);
    if (response.error) {
      console.error("Error booking apppointment:", response.error);
      toast.error(response.error);
      return;
    }
    clearSelected();
    toast.success(response.msg);
  }

  function clearSelected() {
    setSelectedState("");
    setSelectedCity("");
    setSelectedHospital({
      hospital_id: "",
      hospital_name: "",
      appointment_charge: "",
    });
    setSelectedDisease("");
    setNoteError("");
    setIsOpenPopover(false);
    setIsOpenHospitalPopover(false);
    setIsOpenDiseasePopover(false);
  }

  const isButtonDisabled =
    !selectedState ||
    !selectedCity ||
    !selectedHospital ||
    !selectedDisease ||
    !additionalNote ||
    noteError !== "";

  return (
    <div className="flex flex-col justify-center gap-5 mx-5 mt-10">
      <Toaster />
      <p className="text-lg font-bold">Book an appointment</p>
      <div className="flex flex-col flex-wrap md:flex-row items-center gap-5">
        <Select
          isRequired
          label="Select State"
          placeholder="Select your state"
          className="max-w-xs"
          variant="bordered"
          value={selectedState}
          onChange={handleStateChange}
          endContent={
            loadingStates ? (
              <Spinner color="primary" size="sm" className="bottom-1/2" />
            ) : (
              ""
            )
          }
          scrollShadowProps={{
            isEnabled: true,
          }}
        >
          {states.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </Select>

        <Popover
          placement="right"
          isOpen={isOpenPopover && !selectedState}
          onOpenChange={(open) => setIsOpenPopover(open)}
        >
          <PopoverTrigger>
            <Select
              isRequired
              label="Select City"
              placeholder="Select your city"
              className="max-w-xs"
              variant="bordered"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={loadingCities || !selectedState}
              scrollShadowProps={{
                isEnabled: true,
              }}
              endContent={
                loadingCities ? (
                  <Spinner color="primary" size="sm" className="bottom-1/2" />
                ) : (
                  ""
                )
              }
            >
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </Select>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">
                Please select a state first
              </div>
              <div className="text-tiny">
                You must select a state before selecting a city.
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover
          placement="right"
          isOpen={isOpenHospitalPopover && !selectedCity}
          onOpenChange={(open) => setIsOpenHospitalPopover(open)}
        >
          <PopoverTrigger>
            <Select
              isRequired
              label="Select Hospital"
              placeholder="Select your preferred hospital"
              className="max-w-xs"
              variant="bordered"
              value={selectedHospital.hospital_name}
              onChange={handleHospitalChange}
              disabled={loadingCities || !selectedState}
              scrollShadowProps={{
                isEnabled: true,
              }}
              endContent={
                loadingHospitals ? (
                  <Spinner color="primary" size="sm" className="bottom-1/2" />
                ) : (
                  ""
                )
              }
            >
              {hospitals.map((item) => (
                <SelectItem key={item.hospital_id} value={item.hospital_id}>
                  {item.hospital_name}
                </SelectItem>
              ))}
            </Select>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">
                Please select a city first
              </div>
              <div className="text-tiny">
                You must select a city before selecting a hospital.
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Popover
          placement="right"
          isOpen={isOpenDiseasePopover && !selectedHospital}
          onOpenChange={(open) => setIsOpenDiseasePopover(open)}
        >
          <PopoverTrigger>
            <Select
              isRequired
              label="Select Disease"
              placeholder="Select your disease"
              className="max-w-xs"
              variant="bordered"
              value={selectedDisease}
              onChange={handleDiseaseChange}
              disabled={loadingHospitals || !selectedHospital}
              scrollShadowProps={{
                isEnabled: true,
              }}
              endContent={
                loadingDiseases ? (
                  <Spinner color="primary" size="sm" className="bottom-1/2" />
                ) : (
                  ""
                )
              }
            >
              {diseases.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small font-bold">
                Please select a Hospital first
              </div>
              <div className="text-tiny">
                You must select a hospital before selecting a disease.
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Textarea
        isRequired
        isInvalid={noteError !== ""}
        variant="bordered"
        label="Additional Note"
        placeholder="Enter your description"
        errorMessage={noteError}
        className="max-w-lg self-center mt-5"
        onChange={handleAdditionalNoteChange}
      />
      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg max-w-40 self-center"
        onClick={handleAppointmentButtonClick}
        isDisabled={isButtonDisabled}
      >
        Request Appointment
      </Button>
    </div>
  );
}

async function processPayment(
  amount: string,
  name: string,
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const orderId: string = await createOrderId(amount);
    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: parseFloat(amount) * 100,
        currency: "INR",
        name,
        description: "Payment for appointment booking",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          try {
            const result = await fetch("/api/payment/verify", {
              method: "POST",
              body: JSON.stringify(data),
              headers: { "Content-Type": "application/json" },
            });
            const res = await result.json();
            if (res.isOk) {
              resolve({ success: true, message: res.message });
            } else {
              reject({ success: false, message: res.message });
            }
          } catch (error) {
            reject({ success: false, message: "Payment verification failed" });
          }
        },
        prefill: {
          name,
          email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        paymentObject.close();
        console.log("is it failing");
        reject({ success: false, message: response.error.description });
      });
      paymentObject.open();
    });
  } catch (error) {
    return { success: false, message: "Payment Failed" };
  }
}

const createOrderId = async (amount: string) => {
  try {
    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(amount) * 100,
        currency: "INR",
      }),
    });

    if (!response.ok) {
      throw new Error("Order id creation response was not ok");
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("There was a problem with creating order id: ", error);
    toast.error("Order id creation failed");
  }
};
