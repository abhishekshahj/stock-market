import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1NlN5tCD_G0MczL7V7wQMQfm6B3g6S112LTeQgVXYOO4/export?format=csv&gid=1580502555";

export async function fetchAllTimeHighStocks() {
  const res = await fetch(CSV_URL, { cache: "no-store" });
  const csvText = await res.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data
    .map((row: any) => ({
      name: row["Stock Name"],
      symbol: row["Symbol"],
      chg: row["%Chg"],
      price: row["Price"],
      volume: row["Volume"],
    }));
}
