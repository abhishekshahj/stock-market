import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/1NlN5tCD_G0MczL7V7wQMQfm6B3g6S112LTeQgVXYOO4/export?format=csv&gid=1338614511";

export async function fetch52WLStocks() {
  const res = await fetch(CSV_URL, { cache: "no-store" });
  const csvText = await res.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data
    .filter((row: any) => {
      const chg = Number(row["%Chg"]);
      return chg >= 1 && chg <= 2;
    })
    .map((row: any) => ({
      name: row["Stock Name"],
      symbol: row["Symbol"],
      chg: row["%Chg"],
      price: row["Price"],
      volume: row["Volume"],
    }));
}
