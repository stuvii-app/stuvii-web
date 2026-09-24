"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewHomePage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [sizeM2, setSizeM2] = useState("");
  const [style, setStyle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("You need to be signed in.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("homes")
      .insert({
        owner_id: user.id,
        name: name.trim(),
        country: country.trim(),
        region: region.trim(),
        city: city.trim(),
        property_type: propertyType.trim(),
        year_built: yearBuilt ? Number(yearBuilt) : null,
        size_m2: sizeM2 ? Number(sizeM2) : null,
        style: style.trim(),
        privacy_level: "public",
      })
      .select()
      .single();

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push(`/homes/${data.id}`);
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">Add your home</h1>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Home name"
          required
          className="w-full rounded-lg border p-3"
        />

        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          className="w-full rounded-lg border p-3"
        />

        <input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Region"
          className="w-full rounded-lg border p-3"
        />

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="w-full rounded-lg border p-3"
        />

        <input
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          placeholder="Property type"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          value={yearBuilt}
          onChange={(e) => setYearBuilt(e.target.value)}
          placeholder="Year built"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="number"
          step="0.1"
          value={sizeM2}
          onChange={(e) => setSizeM2(e.target.value)}
          placeholder="Size in m²"
          className="w-full rounded-lg border p-3"
        />

        <input
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          placeholder="Style"
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create home"}
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>
    </main>
  );
}