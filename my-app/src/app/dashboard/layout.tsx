import SideNav from '@/app/ui/dashboard/sidenav';
import "@/app/globals.css";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="flex overflow-scroll bg-gray-900 flex-row md:flex-row md:overflow-hidden">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 flex-none w-64 md:w-64 shadow rounded ">
        <SideNav  />
      </div>
      <div className="p-4 flex-grow md:overflow-hidden md:p-1">{children}</div>
    </div>
  );
}