"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter() {
  // This is a built-in Next.js hook that allows you to access the current URL's search parameters.
  const searchParams = useSearchParams();

  // This is gonna allow us to do programmatic navigation between routes in Next.js
  const router = useRouter();

  // This is a built-in Next.js hook that allows you to access the current URL's pathname.
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    // URLSearchParams is a built-in browser API that provides utility methods to work with the query string of a URL.
    const params = new URLSearchParams(searchParams);
    // This builds the URL, yet it doesn't change the URL in the browser.
    params.set("capacity", filter);

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
