'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCreateProperty } from '../store/useStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { open } = useCreateProperty(state => state);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

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

          <div className="h-10 w-10 bg-green-600 relative" onClick={openMenu}>
            {isMenuOpen && (
              <div className="absolute top-full right-0">
                <ul>
                  <li onClick={() => router.push('/favorites')}>favorites</li>
                  <li onClick={() => router.push('/homes')}>homes</li>
                  <li onClick={() => router.push('/reservations')}>
                    reservations
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        closeMenu();
                        signOut();
                      }}
                      className="border-grassGreen border-[1px] rounded-full px-6 py-1 text-body-lg bg-grassGreen text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
