import { Suspense } from "react";
import { ItemsPageClient } from "@/components/items/ItemsPageClient";

export default function Home() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-900 sm:px-8" />}>
      <ItemsPageClient />
    </Suspense>
  );
}
