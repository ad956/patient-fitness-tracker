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
  Spinner,
} from "@nextui-org/react";
import bookAppointment from "@/lib/patient/bookAppointment";
import { SERVER_URL } from "@constants/index";

type Hospital = {
  hospital_id: string;
  hospital_name: string;
};

export default function BookAppointment() {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<Hospital>({
    hospital_id: "",
    hospital_name: "",
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
    { hospital_id: string; hospital_name: string }[]
  >([]);
  const [diseases, setDiseases] = useState<string[]>([]);
  const [additionalNote, setAdditionalNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
      const response = await fetch(`${SERVER_URL}states`);
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoadingStates(false);
    }
  };
  const fetchCities = async () => {
    try {
      const response = await fetch(`${SERVER_URL}city/?state=${selectedState}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    } finally {
      setLoadingCities(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}gethospitals/?state=${selectedState}&city=${selectedCity}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hospitals");
      }
      const data = await response.json();
      console.log("hospitals : " + data);

      setHospitals(data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoadingHospitals(false);
    }
  };

  const fetchDiseases = async () => {
    try {
      const response = await fetch(`${SERVER_URL}gethospitals/disease/`);
      if (!response.ok) {
        throw new Error("Failed to fetch diseases");
      }
      const data = await response.json();
      setDiseases(data);
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

  function handleHospitalChange(e: ChangeEvent<HTMLSelectElement>): void {
    const selectedId = e.target.value;

    const selectedHospitalObj: Hospital | undefined = hospitals.find(
      (hospital) => hospital.hospital_id === selectedId
    );

    if (selectedHospitalObj) {
      setSelectedHospital({
        hospital_id: selectedId,
        hospital_name: selectedHospitalObj.hospital_name,
      });
    }
    setIsOpenHospitalPopover(false);
  }

  function handleDiseaseChange(e: ChangeEvent<HTMLSelectElement>): void {
    setSelectedDisease(e.target.value);
    setIsOpenDiseasePopover(false);
  }

  async function handleAppointmentButtonClick(): Promise<void> {
    try {
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
        throw new Error("Failed to book appointment");
      }
      setAppointmentSuccess(true);
      setShowSuccess(true);
      setShowFailed(false);
      clearSelected();
    } catch (error) {
      console.error("Error booking apppointment:", error);
      setShowSuccess(false);
      setShowFailed(true);
    }
  }

  function clearSelected() {
    setSelectedState("");
    setSelectedCity("");
    // setSelectedHospital("");
    setSelectedDisease("");
    setAdditionalNote("");
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
      <p className="text-lg font-bold">Book an appointment</p>
      <div className="flex flex-row items-center gap-5">
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
