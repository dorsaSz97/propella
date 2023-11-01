"use client";
import { CldUploadWidget } from "next-cloudinary";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { FormValues, ImageType } from "../types";

type ImageUploaderProps = {
  type: ImageType | null;
  errors: FieldErrors<FormValues>;
  setImgStep: React.Dispatch<React.SetStateAction<ImageType | null>>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
};
const ImageUploader = ({
  type,
  setValue,
  getValues,
  errors,
  setImgStep,
}: ImageUploaderProps) => {
  const imageUploadHandler = (res: { info: { secure_url: string } }) => {
    if (type) {
      const prevImages = [...getValues("images")];
      setValue("images", [...prevImages, { type, url: res.info.secure_url }]);
    }

    switch (type) {
      case ImageType.Main:
        setImgStep(ImageType.Kitchen);
        break;
      case ImageType.Kitchen:
        setImgStep(ImageType.Bathroom);
        break;
      case ImageType.Bathroom:
        setImgStep(ImageType.Bedroom);
        break;
      case ImageType.Bedroom:
        setImgStep(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-wrap md:flex-row items-center gap-3">
      <label className="font-semibold text-body-lg">
        {type === null ? (
          "Completed"
        ) : (
          <p>
            Upload the
            <span className="text-grassGreen capitalize"> {type} </span>image:
          </p>
        )}
      </label>

      {/* only renders returned component of the child fn */}
      {/* ({children}) => {
            const open =() => {
              // open widget
            }
            return children({open})
          } */}
      <CldUploadWidget
        uploadPreset="t7vnf4dl" // define default behavior for uploads
        options={{
          multiple: false, // no more than 1 image at a time
          sources: ["local"], // images come from the user's device
        }}
        onUpload={imageUploadHandler}
      >
        {({ open }) => {
          function handleOnClick(e: any) {
            e.preventDefault();
            open();
          }
          return (
            <>
              {type === null ? null : (
                <button
                  onClick={handleOnClick}
                  className="p-3 bg-grassGreen text-white rounded-full hover:bg-opacity-90"
                >
                  Click to Upload
                </button>
              )}
            </>
          );
        }}
      </CldUploadWidget>

      {errors.images?.message && (
        <span className="text-red-700 text-sm">{errors.images.message}</span>
      )}
    </div>
  );
};

export default ImageUploader;
