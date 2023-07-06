import Image from "next/image";
import { SearchInput } from "@/components/SearchInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SearchInput />
    </main>
  );
}
