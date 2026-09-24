import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Stuvii</h1>
      <p className="mt-3 text-gray-600">See how the world lives.</p>

      <div className="mt-8">
        {user ? (
          <div className="space-y-4">
            <p>Signed in as {user.email}</p>

            <div className="flex gap-3">
              <Link
                href="/onboarding"
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                Set up profile
              </Link>

              <Link
                href="/homes/new"
                className="rounded-lg border px-4 py-2"
              >
                Add a home
              </Link>
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-block rounded-lg bg-black px-4 py-2 text-white"
          >
            Sign in
          </Link>
        )}
      </div>
    </main>
  );
}