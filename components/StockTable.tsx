"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import React from "react";

interface Stock {
  ticker: string;
  company: string;
  priceMay2025: number;
  cagr5y: string;
  debtEquity: number;
  upside: string;
  eps: number;
  stockType: string;
}

interface Sector {
  name: string;
  marketCap: string;
  indexWeight: string;
  stocks: Stock[];
}

interface StockTableProps {
  sectors: Sector[];
  index: string;
}

export default function StockTable({ sectors, index }: StockTableProps) {
  const t = useTranslations();
  const [sectorFilter, setSectorFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredSectors = sectors.filter((sector) => {
    if (sectorFilter && sector.name !== sectorFilter) return false;
    return true;
  });

  const stockTypes = ["Large Cap", "Small Cap", "Penny Stock"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        {t("filter_stocks")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-gray-700">{t("sector")}</label>
          <select
            className="w-full p-2 border rounded"
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            <option value="">{t("all")}</option>
            {sectors.map((sector) => (
              <option key={sector.name} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">{t("max_price")}</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder={t("max_price")}
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">{t("stock_type")}</label>
          <select
            className="w-full p-2 border rounded"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">{t("all")}</option>
            {stockTypes.map((type) => (
              <option key={type} value={type}>
                {t(type.toLowerCase().replace(" ", "_"))}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-2 px-4">{t("table_headers.sector")}</th>
              <th className="py-2 px-4">{t("table_headers.market_cap")}</th>
              <th className="py-2 px-4">
                {t("table_headers.index_weight").replace("{index}", index)}
              </th>
              <th className="py-2 px-4">{t("table_headers.ticker")}</th>
              <th className="py-2 px-4">{t("table_headers.company")}</th>
              <th className="py-2 px-4">{t("table_headers.price_may_2025")}</th>
              <th className="py-2 px-4">{t("table_headers.cagr_5y")}</th>
              <th className="py-2 px-4">{t("table_headers.debt_equity")}</th>
              <th className="py-2 px-4">{t("table_headers.upside")}</th>
              <th className="py-2 px-4">{t("table_headers.pl")}</th>
              <th className="py-2 px-4">{t("table_headers.stock_type")}</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredSectors.map((sector) =>
              sector.stocks
                .filter((stock) => {
                  const price = stock.priceMay2025;
                  const maxPrice = parseFloat(priceFilter) || Infinity;
                  const matchesPrice = price <= maxPrice;
                  const matchesType =
                    !typeFilter || stock.stockType === typeFilter;
                  return matchesPrice && matchesType;
                })
                .map((stock) => (
                  <tr key={stock.ticker}>
                    <td className="py-2 px-4">{sector.name}</td>
                    <td className="py-2 px-4">{sector.marketCap}</td>
                    <td className="py-2 px-4">{sector.indexWeight}</td>
                    <td className="py-2 px-4">{stock.ticker}</td>
                    <td className="py-2 px-4">{stock.company}</td>
                    <td className="py-2 px-4">{stock.priceMay2025}</td>
                    <td className="py-2 px-4">{stock.cagr5y}</td>
                    <td className="py-2 px-4">{stock.debtEquity}</td>
                    <td className="py-2 px-4">{stock.upside}</td>
                    <td className="py-2 px-4">
                      {(stock.priceMay2025 / stock.eps).toFixed(2)}
                    </td>
                    <td className="py-2 px-4">{stock.stockType}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}