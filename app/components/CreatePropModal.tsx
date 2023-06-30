"use client";
import React, { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreatePropInputs, ImageGallery } from "../types";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { useCreateProperty } from "../store/useStore";
import countries from "world-countries";
import { useRouter } from "next/navigation";
import ImageUploader, { ImageStep } from "./ImageUploader";

const CreatePropModal = () => {
  const router = useRouter();
  const { close, isOpen } = useCreateProperty((state) => state);
  const [imgUrls, setImgUrls] = useState<ImageGallery | null>(null);
  const [imgStep, setImgStep] = useState<ImageStep | null>(ImageStep.Main);

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

  const formSubmitHandler: SubmitHandler<ICreatePropInputs> = (values) => {
    const newData: ICreatePropInputs = {
      images: [
        imgUrls!.main,
        imgUrls!.kitchen,
        imgUrls!.bathroom,
        imgUrls!.bedroom,
      ],
      title: values.title,
      description: values.description,
      allowedGuests: +values.allowedGuests,
      price: +values.price!,
      options: values.options.slice(),
      country: values.country,
      address: values.address,
      availableDates: [],
    };

    axios.post("/api/homes", newData).then((res: any) => {
      console.log(res);
      close();
      router.push(`/properties/${res.data.home.id}`);
      reset();
    });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute flex items-center justify-center w-full h-full p-4 z-[100] bg-whiteLight bg-opacity-80">
      <div className="flex flex-col gap-5 w-[80%] h-[90%] p-6 rounded-2xl shadow-xl shadow-silverGrey bg-whiteDark">
        <button onClick={close} className="w-fit">
          <IoMdClose size={20} />
        </button>

        <div>
          <h2 className="mb-5 font-bold text-head2 capitalize">
            Airbnb your house
          </h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(formSubmitHandler)}
          >
            <div className="flex items-center gap-3">
              <label htmlFor="title">Title:</label>
              <input
                {...register("title")}
                id="title"
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="description">Description:</label>
              <input
                {...register("description")}
                id="description"
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey"
              />
            </div>

            <div className="w-1/2">
              <h3 className="mb-2 font-semibold text-body-lg">
                Choose the available amenities:
              </h3>
              <ul className="grid grid-cols-3">
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

            <div className="flex items-center gap-3">
              <label htmlFor="price">Price:</label>
              <input
                required
                id="price"
                {...register("price")}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey"
              />
              <span> euros/night</span>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="allowedGuests">Allowed Guests:</label>
              <input
                id="allowedGuests"
                {...register("allowedGuests")}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                {...register("address")}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey"
              />
            </div>

            <div className="flex items-center gap-3">
              <h3 className="mb-2 font-semibold text-body-lgù">
                Where is it located?
              </h3>

              <select
                {...register("country")}
                name="country"
                id="country"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setValue("country", e.target.value);
                }}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey"
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
