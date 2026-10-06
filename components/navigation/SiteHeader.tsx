"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

const sections = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "Questions", href: "/questions" },
  { label: "Search", href: "/search" },
  { label: "Extracurriculars", href: "/involvement" },
  { label: "Collaborate", href: "/collaborate" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const activeIndex = Math.max(
    0,
    sections.findIndex(({ href }) =>
      href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`),
    ),
  );
  const previous = sections[(activeIndex + sections.length - 1) % sections.length];
  const next = sections[(activeIndex + 1) % sections.length];

  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label={`${profile.name}, home`}>
        <span className="brand-mark" aria-hidden="true">A</span>
        <span className="brand-copy">
          <strong>{profile.name}</strong>
          <span>AI engineering · Research systems</span>
        </span>
      </Link>

      <div className="navigation-cluster">
        <Link
          className="nav-arrow"
          href={previous.href}
          aria-label={`Previous section: ${previous.label}`}
          title={`Previous: ${previous.label}`}
        >
          <span aria-hidden="true">←</span>
        </Link>
        <nav className="nav" aria-label="Primary navigation">
          {sections.map((section, index) => (
            <Link
              key={section.href}
              className="nav-tab"
              href={section.href}
              aria-current={index === activeIndex ? "page" : undefined}
            >
              {section.label}
            </Link>
          ))}
        </nav>
        <Link
          className="nav-arrow"
          href={next.href}
          aria-label={`Next section: ${next.label}`}
          title={`Next: ${next.label}`}
        >
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </header>
  );
}