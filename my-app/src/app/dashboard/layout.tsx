import SideNav from '@/app/ui/dashboard/sidenav';
import "@/app/globals.css";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="bg-gray-900 flex ">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 w-full flex-none md:w-64 shadow rounded ">
        <SideNav  />
      </div>
      <div className="md:container md:mx-auto px-4">{children}</div>
    </div>
  );
}