import { redirect } from "next/navigation";
import { fallbackLng } from "./i18n/settings";

export default function IndexPage() {
  redirect(`/${fallbackLng}`);
}
