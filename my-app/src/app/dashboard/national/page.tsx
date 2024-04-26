import NationalOverlay from '@/app/ui/dashboard/national/nationaloverlay';
import "@/app/globals.css";


export default function Page({ children }: { children: React.ReactNode }) {

    return (
      <div className="flex h-screen flex-col md:overflow-hidden">
      <div className="w-full h-full md:w-150">
                  <div className="h-full flex flex-col pt-4 pb-4 md:pt-8 md:pb-8">
                    <NationalOverlay />
                  </div>
        <div className="grow p-1 md:overflow-y-auto md:p-1">{children}</div>
      </div>
      </div>
    );
  }