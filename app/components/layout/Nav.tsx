import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border py-4">
      <Link href="/" className="whitespace-nowrap font-semibold tracking-tight">
        Mahir Yoldaş Gazeloğlu
      </Link>
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm sm:gap-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-muted hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </nav>
  );
}
