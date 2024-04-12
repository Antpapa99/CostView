import { fetchCommune } from '@/app/lib/data';
import penCostArrayCalculator  from '@/app/lib/utils';
import alternativkostnadCalculator  from '@/app/lib/utils';
import totalkostnadCalculator  from '@/app/lib/utils';
import ChartBox from '@/app/ui/dashboard/chartbox';




export default function Page({ children }: { children: React.ReactNode }) {
  fetchCommune();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      
      <div className="w-full flex-none md:w-150"> {/* Size of boxes */}
      <ChartBox />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}



