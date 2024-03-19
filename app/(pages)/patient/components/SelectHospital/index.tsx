"use client";

import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { states } from "@/app/utils/constants";

export default function SelectHospital() {
  const [state, setState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenHospitalPopover, setIsOpenHospitalPopover] = useState(false);
  const [hospitalCities, setHospitalCities] = useState<string[]>([]);

  const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setSelectedCity("");
    setIsOpenPopover(false); // Close the popover when a state is selected
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
      fetchHospitals();
    }
  }, [selectedCity]);

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
      setHospitalCities(data.hospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
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
        isOpen={isOpenPopover && !state} // Show popover only when state is not selected
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
        isOpen={isOpenHospitalPopover}
        onOpenChange={(open) => setIsOpenHospitalPopover(open)}
      >
        <PopoverTrigger>
          <Select
            isRequired
            label="Select Hospital"
            placeholder="Select your preferred hospital"
            className="max-w-xs"
            variant="bordered"
            scrollShadowProps={{
              isEnabled: true,
            }}
          >
            {hospitalCities.map((item) => (
              <SelectItem key={item} value={item} color="warning">
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

      <Button
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
      >
        Request Appointment
      </Button>
    </div>
  );
}
