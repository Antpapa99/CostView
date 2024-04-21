import { Button } from '@nextui-org/react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
export default function SideNav() {
  return (
    <div className="bg-black-600 flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-500 p-4 md:h-40"
        href="./alternativkostnad"
      >
        <div className="w-32 bg-blue-100 md:w-40">
        </div>
      </Link>
      <div className="flex grow flex-row bg-blue-200 justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-blue-200 md:block"></div>
      </div>
    </div>
  );
}