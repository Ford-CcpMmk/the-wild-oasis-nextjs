import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <main className="mt-24">
      {/* fill attribute will fills up the entire element.*/}
      <Image
        src={bg}
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
        fill
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        {/* The whole application is downloaded again. And so that's not what we want at all. Instead, we want our application to feel a bit like a single page application like we had before. */}
        {/* <a href="/cabins">Explore luxury cabins</a> */}

        {/* 
        Why do we need to use Link from Next.js instead of the standard HTML <a> tag?
        1. Client-Side Navigation: The Link component enables client-side navigation, which means that the page transitions are faster and smoother because the browser doesn't need to reload the entire page. This makes your application feel more like a single-page application (SPA).

        2. Prefetching: Next.js can automatically prefetch linked pages in the background, which further speeds up navigation. This is not possible with a standard HTML <a> tag.

        3. Routing: The Link component integrates seamlessly with Next.js's routing system, allowing you to take advantage of dynamic routing and other advanced features. 
        
        4. Each page is downloaded separately as a separate chunk, which will also improve performance

        5. each page that we visit in the browser will actually be cached right in the browser as well. So it will be stored there temporarily. And then as we move around, all these pages will not have to be refetched again.
        */}
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
