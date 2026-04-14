import type { Item } from "@/services/items";
import { ItemCard } from "@/components/items/ItemCard";

type ItemListProps = {
  items: Item[];
};

export function ItemList({ items }: ItemListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-600">
        No items found yet. Seed some test items and refresh.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
