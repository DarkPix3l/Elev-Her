export default function Loading() {
  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    <div className="w-screen h-screen bg-indigo-950 flex items-center justify-center">
      <img src={`${baseURL}/cat-loader.gif`}/>
    </div>
  )
}
