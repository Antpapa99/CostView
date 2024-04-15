import NationalOverlay from '@/app/ui/dashboard/national/nationaloverlay';


export default function Page({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-150"> {/* Size of boxes */}
        <NationalOverlay />
        </div>
        <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    );
  }