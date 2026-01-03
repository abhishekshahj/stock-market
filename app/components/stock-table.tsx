"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type Stock = {
  name: string;
  symbol: string;
  chg: string;
  price: string;
};

type SortKey = "name" | "symbol" | "chg" | "price";
type SortOrder = "asc" | "desc";

export default function StockTable({ data }: { data: Stock[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("chg");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const filteredData = useMemo(() => {
    return data
      .filter((s) =>
        `${s.name} ${s.symbol}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal =
          sortKey === "name" || sortKey === "symbol"
            ? a[sortKey]
            : Number(a[sortKey]);
        const bVal =
          sortKey === "name" || sortKey === "symbol"
            ? b[sortKey]
            : Number(b[sortKey]);

        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [data, search, sortKey, sortOrder]);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      {/* <Input
        placeholder="Search by stock name or symbol..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      /> */}

      {/* Table */}
      <div className="rounded-lg border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead
                label="Stock Name"
                onClick={() => handleSort("name")}
              />
              <SortableHead
                label="Symbol"
                onClick={() => handleSort("symbol")}
              />
              <SortableHead
                label="%Chg"
                onClick={() => handleSort("chg")}
              />
              <SortableHead
                label="Price"
                onClick={() => handleSort("price")}
              />
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((s, i) => (
              <TableRow key={i}>
                <TableCell>{s.name}</TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(s.symbol);
                    }}
                    className="font-medium text-blue-600 hover:underline cursor-pointer"
                    title="Click to copy symbol"
                  >
                    {s.symbol}
                  </button>
                </TableCell>
                <TableCell className="font-semibold">
                  {s.chg}%
                </TableCell>
                <TableCell>{s.price}</TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/* ---------- Helper ---------- */
function SortableHead({
  label,
  onClick,
  align = "left",
}: {
  label: string;
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <TableHead
      onClick={onClick}
      className={`cursor-pointer select-none w-[320px] ${
        align === "right" ? "text-right" : ""
      }`}
    >
      {label} ⬍
    </TableHead>
  );
}
