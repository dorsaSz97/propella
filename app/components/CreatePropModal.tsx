import React, { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ICreatePropInputs } from '../types';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import { useCreateProperty } from '../store/useStore';
import { CldUploadWidget } from 'next-cloudinary';
import countries from 'world-countries';
import { useRouter } from 'next/navigation';

enum Image {
  Main,
  Bedroom,
  Bathroom,
  Kitchen,
}
const CreatePropModal = () => {
  const router = useRouter();
  const { close, isOpen } = useCreateProperty(state => state);
  const [imgUrls, setImgUrls] = useState<{
    main: string;
    bathroom?: string;
    bedroom?: string;
    kitchen?: string;
  } | null>(null);
  const [imageStep, setImageStep] = useState<Image | null>(Image.Main);
  const [latLng, setLatlng] = useState<[number, number]>([0, 0]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePropInputs>({
    defaultValues: {
      country: '',
      images: [],
      options: [],
      address: '',
      availableDates: [],
      allowedGuests: 1,
      price: null,
      title: '',
      description: '',
    },
  });

  const formSubmitHandler: SubmitHandler<ICreatePropInputs> = values => {
    const newData: ICreatePropInputs = {
      images: [
        imgUrls!.main,
        imgUrls!.bathroom ?? '',
        imgUrls!.kitchen ?? '',
        imgUrls!.bedroom ?? '',
      ],
      title: values.title,
      description: values.description,
      allowedGuests: +values.allowedGuests,
      price: values.price ? +values.price : null,
      options: values.options.slice(),
      country: values.country,
      address: values.address,
      availableDates: [],
    };

    console.log(newData);
    axios.post('/api/homes', newData).then((res: any) => {
      close();
      router.push(`/properties/${res.home.id}`);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="absolute z-100 h-[90%] w-[80%] p-4 bg-whiteLight rounded-2xl shadow-xl shadow-silverGrey">
      <button onClick={close}>
        <IoMdClose />
      </button>
      <div>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <input {...register('title')} />

          <input {...register('description')} />

          <label htmlFor="wifi">wifi</label>
          <input
            type="checkbox"
            id="wifi"
            value="wifi"
            {...register('options')}
          />

          <label htmlFor="breakfast">breakfast</label>
          <input
            type="checkbox"
            id="breakfast"
            value="breakfast"
            {...register('options')}
          />

          <label htmlFor="beach">beach</label>
          <input
            type="checkbox"
            id="beach"
            value="beach"
            {...register('options')}
          />

          <label htmlFor="pool">pool</label>
          <input
            type="checkbox"
            id="pool"
            value="pool"
            {...register('options')}
          />

          <label htmlFor="parking">parking</label>
          <input
            type="checkbox"
            id="parking"
            value="parking"
            {...register('options')}
          />

          {imageStep === Image.Main && (
            <>
              <p>main</p>
              <CldUploadWidget
                uploadPreset="t7vnf4dl"
                options={{
                  sources: ['local'],
                }}
                onUpload={(res: any) => {
                  setImgUrls(prev => {
                    setImageStep(Image.Bathroom);
                    return { ...prev, main: res.info.secure_url };
                  });
                }}
              >
                {({ open }) => {
                  function handleOnClick(e: any) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button onClick={handleOnClick}>Upload an Image</button>
                  );
                }}
              </CldUploadWidget>
            </>
          )}
          {imageStep === Image.Bathroom && (
            <>
              <p>bathroom</p>
              <CldUploadWidget
                uploadPreset="t7vnf4dl"
                options={{
                  sources: ['local'],
                }}
                onUpload={(res: any) => {
                  setImgUrls(prev => {
                    setImageStep(null);
                    return {
                      ...prev,
                      bathroom: res.info.secure_url,
                      main: prev!.main,
                    };
                  });
                }}
              >
                {({ open }) => {
                  function handleOnClick(e: any) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button onClick={handleOnClick}>Upload an Image</button>
                  );
                }}
              </CldUploadWidget>
            </>
          )}

          <label>price</label>
          <input {...register('price')} />

          <label>guests</label>
          <input {...register('allowedGuests')} />

          <select
            {...register('country')}
            name="country"
            id=""
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setValue('country', e.target.value);
            }}
          >
            {countries.map(country => {
              return (
                <option value={country.name.common} key={country.cca2}>
                  {country.name.common}
                </option>
              );
            })}
          </select>

          <label htmlFor="">address</label>
          <input {...register('address')} />

          {/* getting the latlng by the address or clicking on the map*/}
          {/* <Map center={latLng} setLatlng={setLatlng} /> */}

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePropModal;
