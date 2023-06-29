"use client";
import Image from "next/image";
import { AiOutlineHeart, AiOutlineCar } from "react-icons/ai";
import { IoGlobeOutline, IoFastFoodOutline } from "react-icons/io5";
import { FaSwimmingPool } from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import { CgCoffee } from "react-icons/cg";
import { GrHomeRounded } from "react-icons/gr";
import { BsAirplane } from "react-icons/bs";
import { IconType } from "react-icons";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { ReactNode, useEffect, useState } from "react";
import { DateRangePicker, Range } from "react-date-range";
import { Property, User } from "@prisma/client";
import axios from "axios";
import FavButton from "./FavButton";

enum Gallery {
  Kitchen,
  Bathroom,
  Bedroom,
  Outside,
}

const PropertyDetails = ({
  selectedProperty,
  currentUser,
}: {
  selectedProperty: Property;
  currentUser: User | null;
}) => {
  const [isFavorited, setIsFavorited] = useState(
    currentUser?.favoriteIds.includes(selectedProperty.id) ?? false
  );
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selectedRange",
      color: "#3b6552",
    },
  ]);

  const [galleryOption, setGalleryOption] = useState<Gallery>(Gallery.Outside);
  const [bgUrl, setBgUrl] = useState(selectedProperty.images[0]);

  useEffect(() => {
    switch (galleryOption) {
      case Gallery.Outside:
        setBgUrl(selectedProperty.images[0]);
        break;
      case Gallery.Bedroom:
        setBgUrl(selectedProperty.images[3]);
        break;
      case Gallery.Bathroom:
        setBgUrl(selectedProperty.images[2]);
        break;
      case Gallery.Kitchen:
        setBgUrl(selectedProperty.images[1]);
        break;
      default:
        break;
    }
  }, [galleryOption]);

  return (
    <main className="px-28 py-12 pb-0">
      {/* Gallery */}
      <section id="gallery" className="my-12">
        <div className="grid grid-cols-5 grid-rows-[150px_150px_150px] gap-4 w-full h-full">
          <Image
            src={selectedProperty.images[0]}
            width={1500}
            height={1500}
            alt="outside"
            className="col-start-1 col-span-3 row-span-3 w-full h-full rounded-3xl object-cover"
          />
          <Image
            src={selectedProperty.images[1]}
            width={800}
            height={800}
            alt="kitchen"
            className="col-start-4 col-span-2 row-span-2 w-full h-full rounded-3xl object-cover"
          />
          <Image
            src={selectedProperty.images[2]}
            width={600}
            height={600}
            alt="bathroom"
            className="w-full h-full rounded-3xl object-cover"
          />
          <Image
            src={selectedProperty.images[3]}
            width={600}
            height={600}
            alt="bedroom"
            className="w-full h-full rounded-3xl object-cover"
          />
        </div>
      </section>

      {/* Title */}
      <section className="flex justify-between my-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-head2 font-bold">{selectedProperty.title}</h2>
          <p>{selectedProperty.country}</p>
        </div>
        {currentUser && selectedProperty.hostId !== currentUser.id && (
          <button
            className="flex justify-center items-center h-[35px] w-[35px] rounded-xl bg-opacity-20 bg-whiteDark"
            onClick={() => {
              setIsFavorited(true);
              axios
                .post(`/api/favorites/${selectedProperty.id}`)
                .then(() => {});
            }}
          >
            {isFavorited ? <AiOutlineHeart fill="red" /> : <AiOutlineHeart />}
          </button>
        )}
      </section>

      {/* Navigation */}
      <nav
        className={`sticky top-[-2rem] py-4 height-[72px] z-40 bg-whiteLight`}
      >
        <ul className="flex gap-8 text-body-lg">
          <li className="hover:text-grassGreen transition-all">
            <a href="#gallery">Gallery</a>
          </li>
          <li className="hover:text-grassGreen transition-all">
            <a href="#amenities">Amenities</a>
          </li>
          <li className="hover:text-grassGreen transition-all">
            <a href="#tour">Virtual tour</a>
          </li>
          <li className="hover:text-grassGreen transition-all">
            <a href="#dates">Available dates</a>
          </li>
        </ul>
      </nav>

      <div className="flex gap-6">
        <div className="flex-[60%]">
          {/* Description */}
          <section className="my-12">
            <p>{selectedProperty.description}</p>
          </section>
          {/* Amenities */}
          <section id="amenities" className="my-12">
            <h3 className="mb-6 text-head3 font-semibold">Amenities</h3>

            <ul className="grid grid-cols-2 gap-6">
              {selectedProperty.options.map((op) => {
                return (
                  <li className="flex gap-4 items-center">
                    {op === "wifi" && (
                      <>
                        <IoGlobeOutline size={18} />
                        <p className="font-semibold capitalize">Fast wifi</p>
                      </>
                    )}
                    {op === "beach" && (
                      <>
                        {" "}
                        <TbBeach size={18} />
                        <p className="font-semibold capitalize">
                          Calm beaches nearby
                        </p>
                      </>
                    )}
                    {op === "breakfast" && (
                      <>
                        <IoFastFoodOutline size={18} />
                        <p className="font-semibold capitalize">
                          Breakfast included
                        </p>
                      </>
                    )}
                    {op === "parking" && (
                      <>
                        {" "}
                        <AiOutlineCar size={18} />
                        <p className="font-semibold capitalize">
                          Free parking on premises
                        </p>
                      </>
                    )}
                    {op === "pool" && (
                      <>
                        <FaSwimmingPool size={18} />
                        <p className="font-semibold capitalize">
                          Private outdoor pool
                        </p>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
          {/* Virtual tour */}
          <section
            id="tour"
            className="relative rounded-2xl my-12 h-[400px] overflow-hidden"
          >
            <Image
              src={bgUrl}
              alt="apartment room"
              fill={true}
              className="absolute top-0 right-0 z-[1] brightness-[65%]"
            />

            <div
              className={`relative z-[2] flex flex-col justify-between h-full p-4`}
            >
              <h3 className="text-head3 mb-2 font-semibold text-white">
                Virtual tour
              </h3>

              <ul className="flex gap-3 self-end">
                <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
                  <button
                    className="w-full h-full flex items-center justify-center"
                    onClick={() => setGalleryOption(Gallery.Outside)}
                  >
                    Outside
                  </button>
                </li>
                <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
                  <button
                    className="w-full h-full flex items-center justify-center"
                    onClick={() => setGalleryOption(Gallery.Bathroom)}
                  >
                    Bathroom
                  </button>
                </li>
                <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
                  <button
                    className="w-full h-full flex items-center justify-center"
                    onClick={() => setGalleryOption(Gallery.Bedroom)}
                  >
                    Bedroom
                  </button>
                </li>
                <li className="rounded-2xl p-3 bg-opacity-40 bg-silverGrey text-white hover:text-black hover:bg-white">
                  <button
                    className="w-full h-full flex items-center justify-center"
                    onClick={() => setGalleryOption(Gallery.Kitchen)}
                  >
                    Kitchen
                  </button>
                </li>
              </ul>
            </div>
          </section>
          {/* Available Datess */}
          <section id="dates" className="my-12">
            <h3 className="mb-6 text-head3 font-semibold">Choose Your Dates</h3>
            <div className="available-dates__calender">
              <DateRangePicker
                minDate={new Date()}
                months={2}
                direction="horizontal"
                ranges={dateRange}
                onChange={(ranges) => {
                  setDateRange([ranges.selectedRange]);
                }}
              />
            </div>
          </section>
        </div>

        <div className="flex-[40%] sticky top-[2rem] h-fit z-50">
          {/* Reservation Modal */}
          <div className="flex flex-col py-32 px-12 rounded-[2rem] bg-whiteDark">
            <div className="flex gap-[1.3rem] mb-[0.5rem]">
              <div className="bg-whiteLight rounded-[1.5rem] p-6  flex flex-col justify-between flex-1">
                <GrHomeRounded size={30} />
                <p className="font-semibold text-body-lg mt-[1.5rem] mb-[0.5rem]">
                  Arrival
                </p>
                <p className="text-body-sm">
                  {dateRange[0]?.startDate?.toDateString()}
                </p>
              </div>
              <div className="bg-whiteLight rounded-[1.5rem] p-6 flex flex-col justify-between flex-1">
                <BsAirplane size={30} />
                <p className="font-semibold text-body-lg mt-[1.5rem] mb-[0.5rem]">
                  Departure
                </p>
                <p className="text-body-sm">
                  {dateRange[0]?.endDate?.toDateString()}
                </p>
              </div>
            </div>
            <div className="bg-whiteLight rounded-[1.5rem] flex justify-between items-center py-3 px-6">
              <p className="font-semibold">Guests</p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    //  guests >= 2 && setGuests(guests-1)
                    setGuests((prev) => (prev >= 2 ? prev - 1 : prev))
                  }
                >
                  -
                </button>
                <span>{guests}</span>
                <button
                  onClick={() => {
                    guests <= selectedProperty.allowedGuests &&
                      setGuests(guests + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="bg-grassGreen text-white flex items-center justify-center px-16 py-[1rem] font-semibold rounded-3xl my-[1rem]"
              onClick={() => {
                console.log({
                  peopleStaying: guests,
                  endDate: dateRange[0]?.endDate,
                  startDate: dateRange[0]?.startDate,
                  propertyId: selectedProperty.id,
                });

                if (dateRange[0]?.endDate && dateRange[0]?.startDate)
                  axios.post("/api/reservations", {
                    peopleStaying: guests,
                    endDate: dateRange[0].endDate,
                    startDate: dateRange[0].startDate,
                    propertyId: selectedProperty.id,
                  });
              }}
            >
              Book apartment
            </button>
            <ul className="bg-whiteLight rounded-[1.5rem] flex flex-col gap-3 py-3 px-6">
              <li className="flex items-center justify-between">
                <p className="font-semibold">Per night</p>
                <span>${selectedProperty.price}</span>
              </li>
              {/* <li className="flex items-center justify-between">
                <p className="font-semibold">Discount</p>
                <span>-10%</span>
              </li> */}
              <li className="flex items-center justify-between">
                <p className="font-semibold">in total</p>
                {dateRange[0]?.endDate && dateRange[0]?.startDate && (
                  <span>
                    $
                    {(dateRange[0].endDate.getDate() -
                      dateRange[0].startDate.getDate() +
                      1) *
                      selectedProperty.price}
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
