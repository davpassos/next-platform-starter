"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    router.push(`/${newLocale}${window.location.pathname}`);
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="bg-blue-700 text-white p-2 rounded"
    >
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  );
}