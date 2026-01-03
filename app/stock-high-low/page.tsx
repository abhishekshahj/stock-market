import { fetch52WHStocks } from "@/lib/fetch52WHStocks";
import { fetch52WLStocks } from "@/lib/fetch52WLStocks";
import StockTable from "../components/stock-table";

export default async function StocksPage() {
  const stocks52WL = await fetch52WLStocks();
  const stocks52WH = await fetch52WHStocks();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="flex flex-col h-auto border rounded-xl p-4">
        <h2 className="text-xl font-bold mb-3">
          52 Week Low Stock
        </h2>

        <div className="flex-1 overflow-auto">
          <StockTable data={stocks52WL} />
        </div>
      </section>

      <section className="flex flex-col h-auto md:h-[520px] border rounded-xl p-4">
        <h2 className="text-xl font-bold mb-3">
          52 Week High Stock
        </h2>

        <div className="flex-1 overflow-auto">
          <StockTable data={stocks52WH} />
        </div>
      </section>
    </div>
  );
}
