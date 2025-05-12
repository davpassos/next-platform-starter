import { useTranslations } from "next-intl";
import Link from "next/link";
import countries from "../data/countries.json";
import React from "react";

export default function Home() {
  const t = useTranslations();

  return (
    <section className="mb-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">{t("title")}</h1>
      <p className="text-lg text-gray-700 mb-6">
        Explore stock market analysis for major countries, covering key sectors
        ranked by market capitalization and index weight. Each page includes
        representative stocks with interactive filters and dynamic P/E
        calculations.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country) => (
          <li key={country.id}>
            <Link
              href={`/countries/${country.id}`}
              className="block bg-white p-4 rounded-lg shadow hover:bg-blue-50"
            >
              {country.name.en} ({country.index})
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}