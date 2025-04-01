// @ will represent our root folder
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

//  Next.js allows us to do is to very easily and automatically self-host any Google font that we want, without that font being downloaded from Google. And this is really amazing, because it will prevent layout shifts and improve performance and even privacy.
const josefin = Josefin_Sans({
  subsets: ["latin"], // set of characters
  display: "swap", // Controls how the font is displayed as it's downloaded. In this case, basically first display the text in some default text, and then once this Josefin_Sans has been downloaded, it will swap that in.

  // This is actually a font with a variable font weight, but if it was not, then we would also specify the weight.
});

console.log(josefin);

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    // %s will get replaced with whatever the title we export from individual pages.
    template: "%s | The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* All we have to is to import class name in our body, so that our entire webpage will get that font. */}
      <body className={`${josefin.className} bg-primary-900 text-primary-100 min-h-screen`}>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
