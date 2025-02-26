"use client";

import { usePathname } from "next/navigation";
import TranslatedHeader from "./TranslatedHeader";

export default function Header() {
  const pathname = usePathname();
  const lng = pathname?.split("/")[1] || "ko"; // default to 'ko' if not found

  return <TranslatedHeader lng={lng} />;
}
