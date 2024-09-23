import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main>
        Hi nigga
      </main>
    </HydrateClient>
  );
}
