import { http } from "@/services/http";

export type Item = {
  id: number;
  name: string;
  type: number;
  price: number;
  quantity: number;
  description?: string | null;
};

export type CreateItemRequest = {
  name: string;
  type: number;
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
