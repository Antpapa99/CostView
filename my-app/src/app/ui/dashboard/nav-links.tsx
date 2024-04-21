'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [

  {
    name: 'Kommun',
    href: '/dashboard/commune',
  },
  { name: 'Nationell', 
    href: '/dashboard/national',
    },
    {name: 'Jämförelse', 
    href: '/dashboard/comparison',}
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-blue-100 p-3 text-sm font-medium hover:bg-blue-400 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-blue-500 text-white': pathname === link.href,
              },
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}