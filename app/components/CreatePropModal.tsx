"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
interface ICreatePropInputs {
  title: string;
  description: string;
  price: number | null;
  country: string;
  address: string;
  allowedGuests: number;
  availableDates: Date[];
  options: string[];
  images: string[];
}
export type ImageGallery = {
  main: string;
  kitchen: string;
  bathroom: string;
  bedroom: string;
};

import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useCreateProperty } from "../store/useStore";
import countries from "world-countries";
import { useRouter } from "next/navigation";
import ImageUploader, { ImageStep } from "./ImageUploader";
import { Property } from "@prisma/client";
import type { Value } from "react-multi-date-picker";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import { getDateArray } from "../properties/PropertiesClient";

const CreatePropModal = () => {
  const router = useRouter();
  const { close, isOpen } = useCreateProperty((state) => state);
  const [imgUrls, setImgUrls] = useState<ImageGallery | null>(null);
  const [imgStep, setImgStep] = useState<ImageStep | null>(ImageStep.Main);
  const [values, setValues] = useState<Date[]>([]);

  useEffect(() => {
    console.log(values);
  }, [values]);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreatePropInputs>({
    defaultValues: {
      title: "",
      description: "",
      country: "",
      images: [],
      options: [],
      address: "",
      availableDates: [],
      allowedGuests: 1,
      price: null,
    },
  });

  const formSubmitHandler: SubmitHandler<ICreatePropInputs> = (formValues) => {
    const newData: ICreatePropInputs = {
      images: [
        imgUrls!.main,
        imgUrls!.kitchen,
        imgUrls!.bathroom,
        imgUrls!.bedroom,
      ],
      title: formValues.title,
      description: formValues.description,
      allowedGuests: +formValues.allowedGuests,
      price: +formValues.price!,
      options: formValues.options.slice(),
      country: formValues.country,
      address: formValues.address,
      availableDates: values!.map((date) => date),
    };

    axios
      .post("/api/homes", newData)
      .then((res: { data: { newProperty: Property } }) => {
        console.log(res);
        close();
        router.push(`/properties/${res.data.newProperty.id}`);
        reset();
      });
  };

  if (!isOpen) return null;

  return (
    <div className=" absolute flex items-center justify-center w-full h-full p-4 z-[100] bg-whiteLight bg-opacity-80">
      <div className="w-full h-full overflow-y-scroll  overflow-x-hidden max-w-[1100px] flex flex-col gap-5 p-6 rounded-2xl shadow-xl shadow-silverGrey bg-whiteDark">
        <button onClick={close} className="w-fit">
          <IoMdClose size={20} />
        </button>

        <div className="flex flex-col flex-1">
          <h2 className="mb-5 font-bold text-head2 capitalize">
            Airbnb your house
          </h2>

          <form
            className="flex flex-col gap-5 flex-1 "
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <div className="flex gap-3 items-start md:items-center flex-col md:flex-row">
              <label htmlFor="title">Title:</label>
              <input
                {...register("title")}
                id="title"
                className="px-2 py-1 rounded-xl shadow-sm max-w-[400px] shadow-silverGrey w-full md:w-auto"
              />
            </div>

            <div className="flex gap-3 items-start md:items-center flex-col md:flex-row">
              <label htmlFor="description">Description:</label>
              <input
                {...register("description")}
                id="description"
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[400px] w-full md:w-auto"
              />
            </div>

            <div className="md:w-1/2 w-full">
              <h3 className="mb-2 font-semibold text-body-lg">
                Choose the available amenities:
              </h3>
              <ul className="grid grid-cols-optionList  max-w-[400px] w-full ">
                <li className="flex items-center gap-1 capitalize">
                  <label htmlFor="wifi">wifi</label>
                  <input
                    type="checkbox"
                    id="wifi"
                    value="wifi"
                    {...register("options")}
                  />
                </li>
                <li className="flex items-center gap-1 capitalize">
                  <label htmlFor="breakfast">breakfast</label>
                  <input
                    type="checkbox"
                    id="breakfast"
                    value="breakfast"
                    {...register("options")}
                  />
                </li>
                <li className="flex items-center gap-1 capitalize">
                  <label htmlFor="beach">beach</label>
                  <input
                    type="checkbox"
                    id="beach"
                    value="beach"
                    {...register("options")}
                  />
                </li>
                <li className="flex items-center gap-1 capitalize">
                  <label htmlFor="pool">pool</label>
                  <input
                    type="checkbox"
                    id="pool"
                    value="pool"
                    {...register("options")}
                  />
                </li>
                <li className="flex items-center gap-1 capitalize">
                  <label htmlFor="parking">parking</label>
                  <input
                    type="checkbox"
                    id="parking"
                    value="parking"
                    {...register("options")}
                  />
                </li>
              </ul>
            </div>

            <ImageUploader
              type={imgStep}
              setImgUrls={setImgUrls}
              setImgStep={setImgStep}
            />

            <div className="flex md:items-center gap-3 flex-col md:flex-row items-start">
              <label htmlFor="price">Price:</label>
              <input
                placeholder="euro/night"
                required
                id="price"
                {...register("price")}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[400px]  w-full md:w-auto"
              />
            </div>

            <div className="flex md:items-center gap-3 flex-col md:flex-row items-start">
              <label htmlFor="allowedGuests">Allowed Guests:</label>
              <input
                id="allowedGuests"
                {...register("allowedGuests")}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[400px] w-full md:w-auto"
              />
            </div>

            <div className="flex md:items-center gap-3 flex-col md:flex-row items-start ">
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                {...register("address")}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[400px] w-full md:w-auto"
              />
            </div>

            <div>
              <h3>Available times</h3>

              <DatePicker
                // value={vals}
                onChange={(_, options) => {
                  const vals: Date[] = [];
                  options.validatedValue
                    .toString()
                    .split(" , ")
                    .map((range) => {
                      if (range.split(" ~ ").length > 1) {
                        vals.push(
                          ...getDateArray(
                            new Date(range.split(" ~ ")[0]),
                            new Date(range.split(" ~ ")[1])
                          )
                        );
                      }
                      if (range.split(" ~ ").length === 1) {
                        vals.push(new Date(range.split(" ~ ")[0]));
                      }
                    });

                  setValues(vals);
                }}
                multiple
                range
                minDate={new Date()}
              />
            </div>

            <div className="flex md:items-center gap-3 flex-col md:flex-row items-start">
              <h3 className="mb-2 font-semibold text-body-lg">
                Where is it located?
              </h3>

              <select
                {...register("country")}
                name="country"
                id="country"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setValue("country", e.target.value);
                }}
                className="w-full px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[400px]"
              >
                {countries.map((country) => {
                  return (
                    <option value={country.name.common} key={country.cca2}>
                      {country.name.common}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* getting the latlng by the address or clicking on the map*/}
            {/* <Map center={latLng} setLatlng={setLatlng} /> */}
            <button
              className="bg-grassGreen text-white p-3 rounded-md self-end"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePropModal;
