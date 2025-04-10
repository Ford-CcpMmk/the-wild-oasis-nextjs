import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

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
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
