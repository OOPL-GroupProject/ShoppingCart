export type Item = {
  id: number;
  name: string;
  type: number;
  price: number;
  quantity: number;
  description?: string | null;
};

type ItemsResponse = Item[] | { data?: Item[] };

function sanitizeApiUrl(value: string): string {
  return value.split("#")[0].trim().replace(/\/$/, "");
}

function getApiBaseUrl(): string {
  const internal = process.env.API_URL;
  if (internal) {
    return sanitizeApiUrl(internal);
  }

  const preferred = process.env.NEXT_PUBLIC_API_URL;
  if (preferred) {
    return sanitizeApiUrl(preferred);
  }

  const csharpBase = process.env.NEXT_PUBLIC_CSHARP_API_URL;
  if (csharpBase) {
    return `${sanitizeApiUrl(csharpBase)}/api`;
  }

  return "http://localhost:5000/api";
}

function normalizeItems(payload: ItemsResponse): Item[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

export async function getItems(): Promise<Item[]> {
  const apiBaseUrl = getApiBaseUrl();

  try {
    const response = await fetch(`${apiBaseUrl}/items`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as ItemsResponse;
    return normalizeItems(payload);
  } catch {
    return [];
  }
}
