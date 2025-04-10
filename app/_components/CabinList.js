import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList() {
  // Opting out one of the components of the page out of the data cache. So basically telling that it should not cache any data will opt out the entire route out of the data cache because it will dynamically generate this entire route itself.

  // You might wonder why should we ever do this here instead of just always revalidating the entire route? Well, right now, as I just mentioned, this makes no difference. But if we think about partial prerendering, it actually makes a lot of sense.
  // noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
