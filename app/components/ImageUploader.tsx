import React, { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ImageGallery } from "./CreatePropModal";

export enum ImageStep {
  Main = "main",
  Kitchen = "kitchen",
  Bathroom = "bathroom",
  Bedroom = "bedroom",
}

const ImageUploader = ({
  type,
  setImgUrls,
  setImgStep,
}: {
  type: ImageStep | null;
  setImgStep: React.Dispatch<React.SetStateAction<ImageStep | null>>;
  setImgUrls: React.Dispatch<React.SetStateAction<ImageGallery | null>>;
}) => {
  return (
    <div className="flex items-center gap-3">
      <h3 className="font-semibold text-body-lg capitalize">
        Upload the {type} image:
      </h3>

      <CldUploadWidget
        uploadPreset="t7vnf4dl"
        options={{
          sources: ["local"],
        }}
        onUpload={(res: any) => {
          setImgUrls((prev) => {
            switch (type) {
              case ImageStep.Main:
                setImgStep(ImageStep.Kitchen);
                return {
                  main: res.info.secure_url as string,
                  kitchen: "",
                  bathroom: "",
                  bedroom: "",
                };
              case ImageStep.Kitchen:
                setImgStep(ImageStep.Bathroom);
                return {
                  kitchen: res.info.secure_url as string,
                  main: prev!.main,
                  bedroom: "",
                  bathroom: "",
                };
              case ImageStep.Bathroom:
                setImgStep(ImageStep.Bedroom);
                return {
                  bathroom: res.info.secure_url,
                  main: prev!.main,
                  kitchen: prev!.kitchen,
                  bedroom: "",
                };
              case ImageStep.Bedroom:
                setImgStep(null);
                return {
                  main: prev!.main,
                  kitchen: prev!.kitchen,
                  bathroom: prev!.bathroom,
                  bedroom: res.info.secure_url,
                };
              default:
                return { main: "", kitchen: "", bathroom: "", bedroom: "" };
            }
          });
        }}
      >
        {({ open }) => {
          function handleOnClick(e: any) {
            e.preventDefault();
            open();
          }
          return <button onClick={handleOnClick}>Click to Upload</button>;
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
