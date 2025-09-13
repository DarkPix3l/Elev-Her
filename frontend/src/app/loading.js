import Image from "next/image";

export default function Loading() {
  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    <div className="w-screen h-screen bg-indigo-950 flex items-center justify-center">
      <Image src={`${baseURL}/cat-loader.gif`} alt="cat image" />
    </div>
  );
}
