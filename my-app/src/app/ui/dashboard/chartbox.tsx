import AltCostChart from "./charts/altcostchart";

export default function ChartBox() {
  return (
    <>
      <section className="flex flex-col my-1 px1 gap-5">
        <div className="flex flex-row gap-5">
          <div className="w-1/2 bg-gray-700 rounded p-2">
            <AltCostChart />
          </div>
          <div className="w-1/2 bg-gray-700 rounded p-2">
          <AltCostChart />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          <AltCostChart />
          </div>
          <div className="w-1/2 bg-gray-700 p-2 h-full">
          <AltCostChart />
          </div>
        </div>
      </section>
    </>
  );
};