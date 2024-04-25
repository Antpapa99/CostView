import { Button } from '@nextui-org/react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Image from 'next/image'
import logo from '/public/costviewlogo.png'
export default function SideNav() {
  return (
    <div className="bg-black-600 flex h-full flex-col px-3 py-4 md:px-2">
      
      
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 p-4 md:h-40"
        href="./alternativkostnad"
      >
        <div className="w-32 bg-gradient-to-r from-violet-600 to-indigo-600 md:w-40">
        </div>
        <Image
      src={logo}
      width={900}
      height={900}
      alt="Please load"
    />
      </Link>
      <div className="flex grow flex-row bg-gradient-to-r from-violet-600 to-indigo-600 justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 md:block"></div>
      </div>
    </div>
  );
}