import useAuthStore from "@/store/auth.store";
import Loading from "@/components/ui/loading";
import Hero from "./lib/comnponents/hero";

export default function Home()
{
  const { loading } = useAuthStore();

  if (loading)
  {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Hero/>
    </div>
  );
}