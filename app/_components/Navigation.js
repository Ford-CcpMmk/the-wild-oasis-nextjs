import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  // Whenever we do this here in a component, it will actually make the entire route dynamic because this authentication works with cookies and headers. And so this auth function needs to read these cookies from the incoming request. And if you remember what we learned in one of the previous lectures, reading cookies actually switches the route to dynamic rendering because, of course, these cookies can only be known at runtime, so never at build time. Now in this situation, since we're calling this auth function in the navigation, which is part of the layout, so it is part of every single route, this makes it so that, basically, our entire website becomes dynamic.

  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link href="/account" className="hover:text-accent-400 transition-colors flex items-center gap-4">
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link href="/account" className="hover:text-accent-400 transition-colors">
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
