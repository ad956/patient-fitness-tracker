"use client";

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { states } from "@/app/utils/constants";

export default function BookAppointment() {
  const [state, setState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [loadingDiseases, setLoadingDiseases] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenHospitalPopover, setIsOpenHospitalPopover] = useState(false);
  const [isOpenDiseasePopover, setIsOpenDiseasePopover] = useState(false);
  const [hospitals, setHospitals] = useState<string[]>([]);
  const [diseases, setDiseases] = useState<string[]>([]);
  const [additionalNote, setAdditionalNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setSelectedCity("");
    setIsOpenPopover(false);
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setIsOpenPopover(false);
  };

  useEffect(() => {
    if (state) {
      setLoadingCities(true);
      fetchCities();
    }
  }, [state]);

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
  useEffect(() => {
    if (appointmentSuccess) {
      setShowSuccess(true);
    } else setShowFailed(true);
  }, [appointmentSuccess]);

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/city/?state=${state}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setCities(data.cities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoadingCities(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/gethospitals/?state=${state}&city=${selectedCity}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const data = await response.json();
      setHospitals(data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoadingHospitals(false);
    }
  };

  const fetchDiseases = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/gethospitals/disease/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch diseases");
      }
      const data = await response.json();
      setDiseases(data.commonDiseases);
    } catch (error) {
      console.error("Error fetching diseases:", error);
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

  function handleHospitalChnage(e: ChangeEvent<HTMLSelectElement>): void {
    setSelectedHospital(e.target.value);
    setIsOpenHospitalPopover(false);
  }

  function handleDiseaseChange(e: ChangeEvent<HTMLSelectElement>): void {
    setSelectedDisease(e.target.value);
    setIsOpenDiseasePopover(false);
  }

  async function handleAppointmentButtonClick(): Promise<void> {
    try {
      const response = await fetch(
        `http://localhost:3000/api/patient/appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient_email: "anandsuthar956@gmail.com",
            date: new Date(),
            state,
            city: selectedCity,
            hospital: selectedHospital,
            disease: selectedDisease,
            note: additionalNote,
            approved: "pending",
          }),
        }
      );
      if (!response.ok) {
        setAppointmentSuccess(false);
        throw new Error("Failed to book appointment");
      } else setAppointmentSuccess(true);
    } catch (error) {
      console.error("Error booking apppointment:", error);
    }
  }

  const isButtonDisabled =
    !state ||
    !selectedCity ||
    !selectedHospital ||
    !selectedDisease ||
    !additionalNote ||
    noteError !== "";

  return (
    <div className="flex flex-col justify-center gap-5 mx-5 mt-10">
      <p className="text-lg font-bold">Book an appointment</p>
      <div className="flex flex-row items-center gap-5">
        <Select
          isRequired
          label="Select State"
          placeholder="Select your state"
          className="max-w-xs"
          variant="bordered"
          value={state}
          onChange={handleStateChange}
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
          isOpen={isOpenPopover && !state}
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
              disabled={loadingCities || !state}
              scrollShadowProps={{
                isEnabled: true,
              }}
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
              value={selectedHospital}
              onChange={handleHospitalChnage}
              disabled={loadingCities || !state}
              scrollShadowProps={{
                isEnabled: true,
              }}
            >
              {hospitals.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
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
        onPress={onOpen}
        isDisabled={isButtonDisabled}
      >
        Request Appointment
      </Button>

      {(showSuccess || showFailed) && (
        <Modal
          isOpen={isOpen}
          placement="bottom-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {showSuccess ? (
              <>
                <ModalHeader className="flex flex-col gap-1 text-success">
                  Appointment Request Successful
                </ModalHeader>
                <ModalBody>
                  <p>
                    Your appointment request has been successfully submitted.
                  </p>
                </ModalBody>
              </>
            ) : (
              <>
                <ModalHeader className="flex flex-col gap-1 text-danger">
                  Appointment Request Failed
                </ModalHeader>
                <ModalBody>
                  <p>Sorry your appointment request failed 😥</p>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
