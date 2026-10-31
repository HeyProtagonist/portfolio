function NavBar({
  links,
  cta,
}: {
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
}) {
  return (
    <div className="w-full px-2 pt-6 md:pt-8">
      <nav className="cp-nav cp-cut-frame text-sm md:text-xl">
        <div className="cp-nav-links">
          {links.map((link) => (
            <a className="cp-nav-link" href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a className="cp-nav-cta" href={cta.href}>
          {cta.label}
        </a>
      </nav>
    </div>
  );
}

export default NavBar;
