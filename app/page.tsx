import { fetch52WLStocks } from "@/lib/fetch52WLStocks";
import { fetch52WHStocks } from "@/lib/fetch52WHStocks";
import StockTable from "./components/stock-table";

export default async function Dashboard() {
  const stocks52WL = await fetch52WLStocks();
  const stocks52WH = await fetch52WHStocks();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 52 Week Low */}
      <section className="flex flex-col h-auto rounded-xl border p-4">
        <h2 className="text-2xl font-bold mb-3">
          52 Week Low Stock
        </h2>

        <div className="flex-1 overflow-auto">
          <StockTable data={stocks52WL} />
        </div>
      </section>

      {/* 52 Week High */}
      <section className="flex flex-col h-auto rounded-xl border p-4">
        <h2 className="text-2xl font-bold mb-3">
          52 Week High Stock
        </h2>

        <div className="flex-1 overflow-auto">
          <StockTable data={stocks52WH} />
        </div>
      </section>
    </div>
  );
}
