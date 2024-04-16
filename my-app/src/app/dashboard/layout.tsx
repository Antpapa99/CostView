import SideNav from '@/app/ui/dashboard/sidenav';

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-gray-400 flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="bg-blue-100 w-full flex-none md:w-64 shadow rounded">
        <SideNav  />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}