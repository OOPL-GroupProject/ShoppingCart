import { http } from "@/services/http";

export enum ItemType {
  Electronics = 0,
  Grocery = 1,
  Clothing = 2,
  Home = 3,
  Beauty = 4,
  Sports = 5,
  Toys = 6,
  Books = 7,
}

export const ITEM_TYPE_OPTIONS: ReadonlyArray<{ value: ItemType; label: string }> = [
  { value: ItemType.Electronics, label: "Electronic" },
  { value: ItemType.Grocery, label: "Grocery" },
  { value: ItemType.Clothing, label: "Clothing" },
  { value: ItemType.Home, label: "Home" },
  { value: ItemType.Beauty, label: "Beauty" },
  { value: ItemType.Sports, label: "Sport" },
  { value: ItemType.Toys, label: "Toy" },
  { value: ItemType.Books, label: "Book" },
];

const ITEM_TYPE_LABELS: Record<number, string> = Object.fromEntries(
  ITEM_TYPE_OPTIONS.map((option) => [option.value, option.label]),
);

export function getItemTypeLabel(type: number): string {
  return ITEM_TYPE_LABELS[type] ?? `Unknown (${type})`;
}

export type Item = {
  id: number;
  name: string;
  type: ItemType;
  price: number;
  quantity: number;
  description?: string | null;
};

export type CreateItemRequest = {
  name: string;
  type: ItemType;
  price: number;
  quantity: number;
  description?: string | null;
};

type ItemsApiResponse = Item[] | { data?: Item[] };

export async function getItems(): Promise<Item[]> {
  const response = await http.get<ItemsApiResponse>("/items");

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data.data ?? [];
}

export async function createItem(payload: CreateItemRequest): Promise<Item> {
  const response = await http.post<Item>("/items", payload);
  return response.data;
}

export async function deleteItem(itemId: number): Promise<void> {
  await http.delete(`/items/${itemId}`);
}
