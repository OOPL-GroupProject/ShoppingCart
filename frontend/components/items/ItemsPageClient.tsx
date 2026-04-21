"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ItemList } from "@/components/items/ItemList";
import { getApiErrorMessage } from "@/services/apiError";
import { getItems, type Item } from "@/services/items";

export function ItemsPageClient() {
  const searchParams = useSearchParams();
  const didShowCreatedToast = useRef(false);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const data = await getItems();
        if (isMounted) {
          setItems(data);
        }
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadItems();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("created") === "1" && !didShowCreatedToast.current) {
      didShowCreatedToast.current = true;
      toast.success("Item created successfully.");
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-900 sm:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart Items</h1>
          <p className="mt-2 text-sm text-blue-50">
            Loaded from the backend REST API endpoint: <code className="font-mono">GET /api/items</code>
          </p>
          <div className="mt-4">
            <Link
              href="/post-item"
              className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Post Item
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-600 shadow-sm">
            Loading items...
          </div>
        ) : (
          <ItemList items={items} />
        )}
      </section>
    </main>
  );
}
