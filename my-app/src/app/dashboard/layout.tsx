import SideNav from '@/app/ui/dashboard/sidenav';
import "@/app/globals.css";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="flex h-full w-full flex-col bg-gray-900 md:flex-row md:overflow-auto">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-full flex-relative md:w-64 shadow rounded ">
        <SideNav  />
      </div>
      <div className="p-1 w-full overflow-scroll md:overflow-hidden md:p-1">{children}</div>
    </div>
  );
}