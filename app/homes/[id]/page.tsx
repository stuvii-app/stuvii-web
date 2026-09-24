import { createClient } from "@/lib/supabase/server";

export default async function HomeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: home, error } = await supabase
    .from("homes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !home) {
    return (
      <main className="p-8">
        <p>Home not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-4xl font-bold">{home.name}</h1>

      <p className="mt-3 text-gray-600">
        {[home.city, home.region, home.country].filter(Boolean).join(", ")}
      </p>

      <div className="mt-6 space-y-2">
        {home.property_type && <p>Type: {home.property_type}</p>}
        {home.year_built && <p>Built: {home.year_built}</p>}
        {home.size_m2 && <p>Size: {home.size_m2} m²</p>}
        {home.style && <p>Style: {home.style}</p>}
      </div>
    </main>
  );
}