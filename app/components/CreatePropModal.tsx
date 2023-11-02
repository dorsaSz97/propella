"use client";
import { useState, useEffect } from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { usePropertyModal } from "../store/useStore";
import countries from "world-countries";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { Property } from "@prisma/client";
import DatePicker from "react-multi-date-picker";
import { getDateArray } from "../properties/PropertiesClient";
import Icon from "react-multi-date-picker/components/icon";
import { FormValues, ImageType } from "../types";

import "react-multi-date-picker/styles/layouts/prime.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

const CreatePropModal = () => {
  const router = useRouter();
  const { close, isOpen } = usePropertyModal((state: any) => state);
  const [imgStep, setImgStep] = useState<ImageType | null>(ImageType.Main);
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 721);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 721);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const datePickerHandler = (
    selectedRanges: string,
    changeDate: (...event: any[]) => void
  ) => {
    const dates: Date[] = [];

    // different ranges are separated by , and start/end by ~
    selectedRanges.split(" , ").map((range) => {
      //single day
      if (range.split(" ~ ").length > 1) {
        dates.push(
          ...getDateArray(
            new Date(range.split(" ~ ")[0]),
            new Date(range.split(" ~ ")[1])
          )
        );
      }
      //range of days
      if (range.split(" ~ ").length === 1) {
        dates.push(new Date(range.split(" ~ ")[0]));
      }
    });
    changeDate(dates);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    // these values goes into the form the user sees first
    defaultValues: {
      title: "",
      description: "",
      options: [],
      images: [],
      price: 0,
      allowedGuests: 1,
      address: "",
      availableDates: [],
      country: "",
    },
  });

  const formErrorHandler: SubmitErrorHandler<FormValues> = (errors) => {
    console.log("this is formerrorhandler");
    console.log(errors);
  };

  const formSubmitHandler: SubmitHandler<FormValues> = (formValues) => {
    console.log("this is formsubmithandler");
    console.log(getValues("images"));

    const newData: FormValues = {
      images: formValues.images,
      title: formValues.title,
      description: formValues.description,
      allowedGuests: formValues.allowedGuests,
      price: formValues.price,
      options: formValues.options.slice(),
      country: formValues.country,
      address: formValues.address,
      availableDates: formValues.availableDates.slice(),
    };

    axios
      .post("/api/homes", newData)
      .then((res: { data: { newProperty: Property } }) => {
        setImgStep(ImageType.Main);
        close();
        router.push(`/properties/${res.data.newProperty.id}`);
        reset();
      });
  };

  if (!isOpen) return null;

  return (
    <div className=" absolute flex items-center justify-center w-full h-full p-4 z-[100] bg-whiteLight bg-opacity-80">
      <div className="w-full h-full overflow-y-scroll overflow-x-hidden max-w-[1100px] flex flex-col gap-5 p-6 rounded-2xl shadow-xl shadow-silverGrey bg-whiteDark">
        <button
          onClick={() => {
            close();
            reset(); //resets errors and form fields
            setImgStep(ImageType.Main);
          }}
          className="w-fit"
        >
          <IoMdClose size={20} />
        </button>

        <div className="flex flex-col flex-1">
          <h2 className="mb-5 font-bold text-head2 capitalize">
            Tell us about your house
          </h2>

          {/* handleSubmit fn gets two callbacks (success + error case), revalidates all inputs before invoking the callbacks and receives the form data or the errors obj */}
          <form
            className="flex flex-col gap-5 flex-1 "
            onSubmit={handleSubmit(formSubmitHandler, formErrorHandler)}
          >
            <div className="flex gap-3 items-start md:items-center flex-col md:flex-row">
              <label htmlFor="title">Title:</label>
              {/* register method allows the registration of an input/select el and
              applies validation rules to them. invoking it returns an object of
              methods and props (onchange, onblur, name, ref ) */}
              <input
                {...register("title", {
                  required: "Title is required",
                })}
                id="title"
                className="px-2 py-1 rounded-xl shadow-sm max-w-[350px] shadow-silverGrey w-full md:w-auto"
              />
              {errors.title?.message && (
                <p className="text-red-700 text-sm ">{errors.title.message}</p>
              )}
            </div>

            <div className="flex gap-3 items-start md:items-center flex-col md:flex-row">
              <label htmlFor="description">Description:</label>
              <input
                {...register("description", {
                  required: "Description is required",
                })}
                id="description"
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[350px] w-full md:w-auto"
              />
              {errors.description?.message && (
                <p className="text-red-700 text-sm ">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="md:w-1/2 w-full">
              <h3 className="mb-2 font-semibold text-body-lg">
                Choose the available amenities:
              </h3>
              <ul className="grid grid-cols-optionList  max-w-[350px] w-full ">
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

            {/* Images Input */}
            <Controller
              // connect react-hook-form to custom components (allows validation and access to field values and states)
              control={control}
              // should match the key in form values object
              name="images"
              // validation rules
              rules={{
                validate: (value) =>
                  value.length !== 4 && "4 images is required",
              }}
              // access field and fieldState / renders the custom controlled component
              render={() => (
                <ImageUploader
                  type={imgStep}
                  setValue={setValue}
                  getValues={getValues}
                  errors={errors}
                  setImgStep={setImgStep}
                />
              )}
            />

            <div className="flex flex-wrap md:flex-row items-center gap-3">
              <label htmlFor="price">Price:</label>
              <input
                placeholder="euro/night"
                id="price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  validate: (value) => {
                    if (isNaN(value)) return "Should be a number";

                    if (value <= 0) return "Should be a valid number";
                  },
                  // validate: {
                  //   beNumber: (value) => isNaN(value) && "Should be a number",
                  //   beValid: (value) =>
                  //     value === 0 && "Should be a valid number",
                  // },
                })}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[350px]  w-full md:w-auto"
              />
              {errors.price?.message && (
                <p className="text-red-700 text-sm ">{errors.price.message}</p>
              )}
            </div>

            <div className="flex md:items-center gap-3 flex-col md:flex-row items-start">
              <label htmlFor="allowedGuests">Allowed Guests:</label>
              <input
                id="allowedGuests"
                {...register("allowedGuests", {
                  required: "Guests number is required",
                  valueAsNumber: true,
                  validate: (value) => {
                    if (isNaN(value)) return "Should be a number";

                    if (value <= 0) return "Should be a valid number";
                  },
                })}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[350px] w-full md:w-auto"
              />
              {errors.allowedGuests?.message && (
                <p className="text-red-700 text-sm ">
                  {errors.allowedGuests.message}
                </p>
              )}
            </div>

            <div className="flex md:items-center gap-3 flex-col md:flex-row items-start ">
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                {...register("address", {
                  required: "Address is required",
                })}
                className="px-2 py-1 rounded-xl shadow-sm shadow-silverGrey max-w-[350px] w-full md:w-auto"
              />
              {errors.address?.message && (
                <p className="text-red-700 text-sm ">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Times Input */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
              <label className="mb-2 md:mb-0 font-semibold text-body-lg">
                Available times
              </label>

              <Controller
                control={control}
                name="availableDates"
                rules={{
                  required: "Available times is required",
                }}
                render={({ field: { onChange: changeAvailableDates } }) => (
                  <>
                    <DatePicker
                      multiple
                      range
                      minDate={new Date()}
                      onChange={(_, options) => {
                        datePickerHandler(
                          options.validatedValue.toString(),
                          changeAvailableDates
                        );
                      }}
                      //   @media (min-width: 768px) {
                      //     .md\:m-0 {
                      //         margin: 0px;
                      //     }
                      //   }
                      render={<Icon />}
                      className={`${isDesktop ? "rmdp-prime" : "rmdp-mobile"}`}
                    />
                    {errors.availableDates?.message && (
                      <span className="mt-1 md:m-0 text-red-700 text-sm">
                        {errors.availableDates.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>

            {/* Country Input */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-3">
              <label className="mb-2 md:mb-0 font-semibold text-body-lg">
                Where is it located?
              </label>

              <select
                {...register("country", {
                  required: "Country is required",
                })}
                id="country"
                className="w-full max-w-[350px] px-2 py-1 rounded-xl shadow-sm shadow-silverGrey"
              >
                {countries.map((country) => (
                  <option key={country.cca2} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>

              {errors.country?.message && (
                <span className="mt-1 md:m-0 text-red-700 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-grassGreen text-white p-3 rounded-md self-end"
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
