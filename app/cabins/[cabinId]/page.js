// Very nice shortcut to remove unused imports is shift + option + o
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin details",
// };

// Instead of exporting this variable called matadata, we can also export a function called generateMetadata. And this is gonna be an async function because here we are going to fetch basically, the name of the pages so that we can then place it there in the title.
export async function generateMetadata({ params }) {
  // This can get an error if ID doesn't exist, so it will display error.js but we want to display not-found.js page instead, we can use notFound function to manually trigger the not-found page. (notFound function was called on the data-service.js)
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// We can use the generateStaticParams function to let Next.js know about all the possible values of a dynamic URL segment so that we can then export those pages as static pages. if we tell Next.js about the possible set of IDs that this dynamic segment here can take here, then Next.js will be able to render those pages as static pages as well.
export async function generateStaticParams() {
  // This will return an array of objects with the cabinId property
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // It is faster because we can fetch parallelly. However, this is still not perfect because this can only be as fast as the slowest promise. but we can do even better than this. So instead of fetching all the data here on the parent page, we can just create a bunch of different components and then have each component fetch all the data that it needs, and then those components can be streamed in as they become ready.
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
