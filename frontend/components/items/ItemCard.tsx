import { getItemTypeLabel, type Item } from "@/services/items";

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900">{item.name}</h3>
        <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
          {getItemTypeLabel(item.type)}
        </span>
      </div>

      <div className="mb-3 text-sm text-zinc-600">{item.description || "No description"}</div>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-sm">
        <span className="font-medium text-zinc-800">${Number(item.price).toFixed(2)}</span>
        <span className="text-zinc-600">Qty: {item.quantity}</span>
      </div>
    </article>
  );
}
