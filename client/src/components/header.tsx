import React from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/posts",
    label: "Posts",
  },
];

export default function Header() {
  return (
    <header>
      <Image
        src="https://bytegrad.com/course-assets/youtube/example-logo.png"
        alt="logo"
        className="w-[35px] h-[35px]"
        width="35"
        height="35"
      />
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
