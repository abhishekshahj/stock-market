"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RiskRewardCalc() {
  // INPUT STATES
  const [priceInput, setPriceInput] = useState("");
  const [slInput, setSlInput] = useState("");
  const [slType, setSlType] = useState<"percent" | "price">("percent");

  // CALCULATED STATE
  const [result, setResult] = useState<{
    price: number;
    stopLoss: number;
    risk: number;
  } | null>(null);

  function handleCalculate() {
    const price = Number(priceInput);
    const slValue = Number(slInput);

    if (!price || !slValue) return;

    const stopLoss =
      slType === "percent"
        ? price - price * (slValue / 100)
        : slValue;

    const risk = price - stopLoss;

    if (risk <= 0) return;

    setResult({
      price,
      stopLoss,
      risk,
    });
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Risk Reward Calculator</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            type="number"
            placeholder="Stock Price (e.g. 100)"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
          />

          <Input
            type="number"
            placeholder={
              slType === "percent"
                ? "Stop Loss % (e.g. 10)"
                : "Stop Loss Price (e.g. 90)"
            }
            value={slInput}
            onChange={(e) => setSlInput(e.target.value)}
          />

          <Button
            variant="outline"
            onClick={() =>
              setSlType(slType === "percent" ? "price" : "percent")
            }
          >
            {slType === "percent" ? "Use Price" : "Use %"}
          </Button>
        </div>

        {/* Calculate Button */}
        <Button className="w-full" onClick={handleCalculate}>
          Calculate
        </Button>

        {/* Results */}
        {result && (
          <>
            <div className="text-sm space-y-1">
              <p>
                📉 Stop Loss Price:{" "}
                <strong>{result.stopLoss.toFixed(2)}</strong>
              </p>
              <p>
                ⚠️ Risk per trade:{" "}
                <strong>{result.risk.toFixed(2)}</strong>
              </p>
            </div>

            <div className="rounded-lg border overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Risk : Reward</TableHead>
                    <TableHead>Stop Loss</TableHead>
                    <TableHead>Take Profit</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {Array.from({ length: 10 }, (_, i) => {
                    const rr = i + 1;
                    const target =
                      result.price + result.risk * rr;

                    return (
                      <TableRow key={rr}>
                        <TableCell>1 : {rr}</TableCell>
                        <TableCell>
                          {result.stopLoss.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          {target.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
