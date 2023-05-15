'use client';
import Image from 'next/image';
import { AiOutlineHeart, AiOutlineCar } from 'react-icons/ai';
import { IoGlobeOutline, IoFastFoodOutline } from 'react-icons/io5';
import { FaSwimmingPool } from 'react-icons/fa';
import { TbBeach } from 'react-icons/tb';
import { CgCoffee } from 'react-icons/cg';
import { IconType } from 'react-icons';
import { useState, useEffect } from 'react';

interface Category {
  name: string;
  icon: IconType;
}
const categories: Category[] = [
  { name: 'Food', icon: IoFastFoodOutline },
  { name: 'Parking', icon: AiOutlineCar },
  { name: 'Pool', icon: FaSwimmingPool },
];

export default function PropertyPage() {
  return (
    <main className="px-16 py-14">
      {/* photos */}
      <section id="photo" className="flex flex-col gap-10 mb-10">
        {/* images */}
        <div className="grid grid-cols-5 gap-4 grid-rows-[150px_150px_150px]">
          <Image
            src={'/prop1.jpg'}
            width={1000}
            height={1000}
            alt="main room"
            className="col-start-1 col-span-3 w-full row-span-3 rounded-2xl object-cover h-full"
          />
          <Image
            src={'/prop2.jpg'}
            width={600}
            height={600}
            alt="kitchen"
            className="col-start-4 col-span-2 row-start-1 row-span-2 rounded-2xl object-cover h-full"
          />
          <Image
            src={'/prop3.jpg'}
            width={600}
            height={600}
            alt="bathroom"
            className="col-start-4 col-span-1 row-start-3 row-span-1 rounded-2xl object-cover h-full"
          />
          <Image
            src={'/prop4.jpg'}
            width={600}
            height={600}
            alt="bedroom"
            className="col-start-5 col-span-1 row-start-3 row-span-1 rounded-2xl object-cover h-full"
          />
        </div>
        {/* text */}
        <div>
          <div className="flex justify-between ">
            <h2 className="text-head2 font-bold">Villa Casa Bella</h2>
            <button className=" h-[35px] w-[35px] flex justify-center items-center bg-silverGrey rounded-lg bg-opacity-25 ">
              <AiOutlineHeart />
            </button>
          </div>
          <p>Catania, Italy</p>
        </div>
      </section>
      <nav className={`top-0 py-10 sticky bg-white`}>
        <ul className="flex gap-8 text-body-lg">
          <li className="">
            <a href="#photo">Photo</a>
          </li>
          <li className="">
            <a href="#amenities">Amenities</a>
          </li>
          <li className="">
            <a href="#tour">Virtual tour</a>
          </li>
          <li className="">
            <a href="#dates">Available dates</a>
          </li>
          <li className="">
            <a href="#location">Location</a>
          </li>
          <li className="">
            <a href="#reviews">Reviews</a>
          </li>
        </ul>
      </nav>
      <div className="flex gap-6">
        <div className="flex-[60%]">
          {/* description */}
          <section>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
              fugit reprehenderit dolor. Iusto neque laudantium dolorem saepe
              perferendis placeat dolore beatae dicta voluptate harum quaerat
              alias minus earum, quod fugit, quisquam, ratione cum itaque
              corrupti aut pariatur nisi molestias blanditiis!
            </p>
          </section>
          {/* amenities */}
          <section>
            <h3 className="text-head3 mb-3 mt-6 font-bold">Amenities</h3>
            <ul className="grid grid-cols-2 gap-3">
              <li className="flex gap-4 items-center">
                <IoGlobeOutline />
                <p className="font-semibold capitalize">Fast wifi</p>
              </li>
              <li className="flex gap-4 items-center">
                <TbBeach />
                <p className="font-semibold capitalize">Calm beaches nearby</p>
              </li>
              <li className="flex gap-4 items-center">
                <IoFastFoodOutline />
                <p className="font-semibold capitalize">Breakfast included</p>
              </li>
              <li className="flex gap-4 items-center">
                <FaSwimmingPool />
                <p className="font-semibold capitalize">Private outdoor pool</p>
              </li>
              <li className="flex gap-4 items-center">
                <AiOutlineCar />
                <p className="font-semibold capitalize">
                  Free parking on premises
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <CgCoffee />
                <p className="font-semibold capitalize">Coffee machine</p>
              </li>
            </ul>
          </section>
        
        </div>
        <div className="flex-[40%]">right</div>
      </div>
    </main>
  );
}
