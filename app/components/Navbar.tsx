'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCreateProperty } from '../store/useStore';

const Navbar = () => {
  const { data: session } = useSession();
  const { open } = useCreateProperty(state => state);
  console.log(session);
  return (
    <header className="flex justify-between items-center px-5 py-3">
      <h1 className="font-bold text-head1 text-grassGreen">
        <a href="/properties">Propella</a>
      </h1>
      {!session && (
        <div className="flex gap-4 items-center">
          <Link
            href={'/getting-started?type=login'}
            className="border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg"
          >
            Login
          </Link>
          <Link
            className="border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg bg-grassGreen text-white"
            href={'/getting-started?type=register'}
          >
            Register
          </Link>
        </div>
      )}
      {/* avatars.githubusercontent.com */}
      {/* {session?.user?.image ? (
        <Image
          alt="user photo"
          src={session.user?.image || ''}
          width={50}
          height={50}
        />
      ) : } */}
      {session && (
        <div>
          <button onClick={open}>Airbnb your house</button>

          <button
            onClick={() => signOut()}
            className="border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg bg-grassGreen text-white"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
