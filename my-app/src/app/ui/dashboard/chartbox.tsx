import AltCostChart from "./charts/altcostchart";
import CommuneDropdownItem from "./communedropdown";
import { kommuner } from './communedropdown';
import PenValueChart from "./charts/penvaluechart"; 
import NationalAvgAltCostChart from "./charts/nationalavgchart";

export default function ChartBox() {
  return (
    <>
      <section className="flex flex-col my-1 px1 gap-5">
        <div className="flex flex-col gap-1">
          <CommuneDropdownItem kommuner={kommuner} />
        </div>
        <div className="flex flex-row gap-5">

          <div className="w-1/2 bg-gray-700 rounded p-2">
            <AltCostChart />
          </div>
          <div className="w-1/2 bg-gray-700 rounded p-2">
          <PenValueChart />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          <NationalAvgAltCostChart />
          </div>
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          <AltCostChart />
          </div>
        </div>
      </section>
    </>
  );
};