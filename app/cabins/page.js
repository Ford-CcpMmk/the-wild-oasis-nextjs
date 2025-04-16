import CabinList from "@/app/_components/CabinList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

// Now one important thing about this is that this searchParams can of course also not be known at runtime. So right now, this cabin's overview page will now always be dynamically rendered, meaning that what we have here, so this revalidate, this now no longer takes any effect because this only applies to statically generated pages.
// export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

// searchParams & normal params is only available on the page.
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        {/* When we swap the filter but the spinner is not displayed because a  navigation in Next.js always wrapped in a React transition. And in a transition, the suspense will not hide the content that has already been rendered ealier. So that's just the default behavior of suspense but we can fix that with give the unique key to suspense.*/}
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
