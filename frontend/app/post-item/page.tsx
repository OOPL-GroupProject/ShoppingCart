"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/services/apiError";
import { createItem } from "@/services/items";

type FormValues = {
  name: string;
  type: string;
  price: string;
  quantity: string;
  description: string;
};

const initialFormValues: FormValues = {
  name: "",
  type: "0",
  price: "",
  quantity: "0",
  description: "",
};

export default function PostItemPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    const itemName = formValues.name.trim();
    const itemType = Number(formValues.type);
    const itemPrice = Number(formValues.price);
    const itemQuantity = Number(formValues.quantity);

    if (!itemName) {
      toast.error("Please enter an item name.");
      return;
    }

    if (!Number.isFinite(itemPrice) || itemPrice <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    if (!Number.isFinite(itemQuantity) || itemQuantity < 0) {
      toast.error("Quantity cannot be negative.");
      return;
    }

    setIsSaving(true);

    try {
      await createItem({
        name: itemName,
        type: Number.isFinite(itemType) ? itemType : 0,
        price: itemPrice,
        quantity: itemQuantity,
        description: formValues.description.trim() || null,
      });

      router.push("/?created=1");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10 text-zinc-900 sm:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold tracking-tight">Post Item</h1>
          <p className="mt-2 text-sm text-blue-50">Create a new item and save it to the API.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 sm:col-span-2">
              Name
              <input
                value={formValues.name}
                onChange={(event) => setFormValues((current) => ({ ...current, name: event.target.value }))}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring"
                placeholder="Item name"
                required
                disabled={isSaving}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
              Type
              <input
                type="number"
                value={formValues.type}
                onChange={(event) => setFormValues((current) => ({ ...current, type: event.target.value }))}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring"
                min={0}
                step={1}
                disabled={isSaving}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
              Price
              <input
                type="number"
                value={formValues.price}
                onChange={(event) => setFormValues((current) => ({ ...current, price: event.target.value }))}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring"
                min={0.01}
                step="0.01"
                required
                disabled={isSaving}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 sm:col-span-2">
              Quantity
              <input
                type="number"
                value={formValues.quantity}
                onChange={(event) => setFormValues((current) => ({ ...current, quantity: event.target.value }))}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring"
                min={0}
                step={1}
                required
                disabled={isSaving}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700 sm:col-span-2">
              Description
              <textarea
                value={formValues.description}
                onChange={(event) =>
                  setFormValues((current) => ({ ...current, description: event.target.value }))
                }
                className="min-h-28 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 outline-none ring-blue-200 transition focus:border-blue-500 focus:ring"
                placeholder="Optional description"
                disabled={isSaving}
              />
            </label>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Item"}
            </button>

            <Link
              href="/"
              className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
