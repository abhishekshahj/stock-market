"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockCalc() {
  const [price, setPrice] = useState<number>(0);
  const [percent, setPercent] = useState<number>(0);

  const addedValue = (price * percent) / 100;
  const finalPrice = price + addedValue;

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Stock TP / SL Calculator</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          type="number"
          placeholder="Stock Price (e.g. 255)"
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <Input
          type="number"
          placeholder="Percentage (e.g. 10)"
          onChange={(e) => setPercent(Number(e.target.value))}
        />

        {price > 0 && percent > 0 && (
          <div className="space-y-1 text-sm">
            <p>
              ➕ Added Value:{" "}
              <span className="font-semibold text-green-600">
                {addedValue.toFixed(2)}
              </span>
            </p>
            <p>
              🎯 Final Price:{" "}
              <span className="font-semibold text-blue-600">
                {finalPrice.toFixed(2)}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
