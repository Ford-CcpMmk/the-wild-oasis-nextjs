import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* This image component does is 3 important things: */}
      {/* 1. It will automatically serve correctly sized images in modern format for example webp. And will also only do this on demand, so only when it's actually necessary.  */}
      {/* 2. The image component prevents layout shifts because it forces us to specify the exact height and width. */}
      {/* 3. It also automatically lazy loads images only when they actually enter the viewport. */}

      {/* This is the easiest way to specify Image component. */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}

      {/* Second way, we do not specify the src like the easiest way but instead, we first actually import the image, and then we use that imported image. This way, Nextjs will be able to analyze the image first and then we do not need to specify the height and width. And when we import logo like this, which we call a statically imported image, then we can add a few other properties like the quality. So basically as the page is loaded, nextjs will figure out what the image should look like and what size it should be.*/}
      <Image src={logo} quality={100} height="60" width="60" alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">The Wild Oasis</span>
    </Link>
  );
}

export default Logo;
