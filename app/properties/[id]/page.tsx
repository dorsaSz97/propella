import Image from 'next/image';
import { AiOutlineHeart } from 'react-icons/ai';

export default function PropertyPage() {
  return (
    <main className="px-16 py-14">
      {/* top part */}
      <section className="flex flex-col gap-10">
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
    </main>
  );
}
