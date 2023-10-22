import { Property } from "@prisma/client";
import { AiOutlineCar } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { IoFastFoodOutline, IoGlobeOutline } from "react-icons/io5";
import { TbBeach } from "react-icons/tb";

const Amenities = ({ selectedProperty }: { selectedProperty: Property }) => {
  return (
    <section id="amenities" className="my-12">
      <h3 className="mb-6 text-head3 font-semibold">Amenities</h3>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedProperty.options.map((op) => {
          return (
            <li className="flex gap-4 items-center" key={op}>
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
                  <p className="font-semibold capitalize">Breakfast included</p>
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
  );
};

export default Amenities;
