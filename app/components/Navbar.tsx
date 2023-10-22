"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useCreateProperty } from "../store/useStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = ({ hasExtra }: { hasExtra?: true }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { open } = useCreateProperty((state) => state);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center">
      <h1 className="font-bold text-head1 text-grassGreen">
        <a href="/properties">Propella</a>
      </h1>

      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <button
              className="md:block hidden underline underline-offset-2 hover:no-underline"
              onClick={open}
            >
              Airbnb your house
            </button>

            <div
              className="h-10 w-10 rounded-full bg-grassGreen bg-opacity-80 relative cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen && (
                <div className="absolute top-[110%] right-0 z-[50] p-6 bg-whiteDark bg-opacity-70 rounded-lg backdrop-blur-sm">
                  <ul className="capitalize text-right flex flex-col gap-2">
                    <li onClick={() => router.push("/favorites")}>favorites</li>
                    <li onClick={() => router.push("/homes")}>your homes</li>
                    <li onClick={() => router.push("/reservations")}>
                      reservations
                    </li>

                    <li
                      className="md:hidden underline underline-offset-2 hover:no-underline"
                      onClick={open}
                    >
                      Airbnb your house
                    </li>

                    <li>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          signOut();
                        }}
                        className="border-grassGreen border-[1px] rounded-full px-4 py-1 bg-grassGreen text-white mt-6"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <Link
              href={"/getting-started?type=login"}
              className="border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg"
            >
              Login
            </Link>
            <Link
              className="hidden md:inline border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg bg-grassGreen text-white"
              href={"/getting-started?type=register"}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
