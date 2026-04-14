import { ItemList } from "@/components/items/ItemList";
import { getItems } from "@/services/items";

export default async function Home() {
  const items = await getItems();

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-900 sm:px-8">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart Items</h1>
          <p className="mt-2 text-sm text-blue-50">
            Loaded from the backend REST API endpoint: <code className="font-mono">GET /api/items</code>
          </p>
        </div>

        <ItemList items={items} />
      </section>
    </main>
  );
}
