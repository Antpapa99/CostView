import SideNav from '@/app/ui/dashboard/sidenav';

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-gray-400 flex h-screen md:overflow-scroll">
      <div className="bg-blue-100 w-full flex-none md:w-64 shadow rounded ">
        <SideNav  />
      </div>
      <div className="md:container md:mx-auto px-4">{children}</div>
    </div>
  );
}