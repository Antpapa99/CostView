import SideNav from '@/app/ui/dashboard/sidenav';
import "@/app/globals.css";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="flex h-full w-full  bg-gray-900 overflow-auto flex-row md:flex-row md:overflow-auto">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-64 flex-none md:w-64 shadow rounded ">
        <SideNav  />
      </div>
      <div className="p-4 md:overflow-hidden md:p-1">{children}</div>
    </div>
  );
}