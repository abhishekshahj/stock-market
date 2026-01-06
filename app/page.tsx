import { fetchNear52WLStocks } from "@/lib/fetchNear52WLStocks";
import { fetchNear52WHStocks } from "@/lib/fetchNear52WHStocks";
import { fetchAllTimeHighStocks } from "@/lib/fetchAllTimeHighStocks";
import StockTable from "./components/stock-table";

export default async function Dashboard() {
  const stocksNear52WL = await fetchNear52WLStocks();
  const stocksNear52WH = await fetchNear52WHStocks();
  const stocksAllTimeHigh = await fetchAllTimeHighStocks();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 52 Week Low */}
      <section className="flex flex-col h-lvh rounded-xl border p-4">
        <h2 className="text-2xl font-bold mb-3">
          3% Near To 52 Week Low
        </h2>

        <div className="flex-1 overflow-auto">
          <StockTable data={stocksNear52WL} />
        </div>
      </section>

      {/* 52 Week High */}
      <section className="flex flex-col h-lvh rounded-xl border p-4">
        <h2 className="text-2xl font-bold mb-3">
          3% Near To 52 Week High
        </h2>

        <div className="flex-1 overflow-auto">
          <StockTable data={stocksNear52WH} />
        </div>
      </section>

      {/* All Time High */}
      <section className="flex flex-col h-lvh rounded-xl border p-4">
        <h2 className="text-2xl font-bold mb-3">
          FUTURES ALL TIME HIGH
        </h2>

        <div className="flex-1 overflow-auto">
          <StockTable data={stocksAllTimeHigh} />
        </div>
      </section>
    </div>
  );
}
