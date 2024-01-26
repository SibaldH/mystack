import supabase from "@/config/supabaseClient";

export default function Home() {
  console.log(supabase);

  return <main>Hello world!</main>;
}
