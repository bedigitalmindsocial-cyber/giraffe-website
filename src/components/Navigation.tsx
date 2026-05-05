'use client';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { label: 'People', href: '#team' },
  { label: 'Work', href: '#work' },
  { label: 'Roles', href: '#roles' },
  { label: 'Life here', href: '#gallery' },
  { label: 'Apply', href: '#apply' },
];

export function Navigation() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      setScrolled(scrollTop > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? 'bg-paper/90 backdrop-blur-md border-rule'
            : 'bg-white/85 backdrop-blur-md border-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 h-[2px] bg-accent-purple"
          style={{ width: `${progress}%` }}
        />

        <div className="container-content flex items-center justify-between h-24">
          {/* Logo */}
          <a
            href="#main-content"
            className="flex items-center group"
            aria-label="Giraffe Partners home"
          >
            <img
              src="/logo.png"
              alt="Giraffe Partners"
              className="h-16 w-auto group-hover:opacity-80 transition-opacity"
            />
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Sections"
            className="hidden md:flex items-center gap-7"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] text-ink hover:text-accent-purple transition-colors uppercase tracking-[0.18em]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <a
            href="https://giraffe.partners"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit giraffe.partners — opens in a new tab"
            className="hidden md:inline-flex group items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] border border-rule rounded-full px-4 py-2 text-ink hover:bg-accent-purple hover:text-paper hover:border-accent-purple transition-colors"
          >
            <span>Visit giraffe.partners</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <span
                className={`block w-full h-0.5 bg-ink transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-ink transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-full h-0.5 bg-ink transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 top-24 bg-black/20 md:hidden z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-24 left-0 right-0 bg-paper border-b border-rule md:hidden z-40 overflow-y-auto max-h-[calc(100vh-96px)] w-full">
            <nav className="flex flex-col p-6 gap-6 container-content">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="font-mono text-[13px] text-ink hover:text-accent-purple transition-colors uppercase tracking-[0.18em]"
                >
                  {item.label}
                </a>
              ))}

              <hr className="border-rule my-2" />

              <a
                href="https://giraffe.partners"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] border border-rule rounded-full px-4 py-2 text-ink hover:bg-accent-purple hover:text-paper hover:border-accent-purple transition-colors w-fit"
              >
                <span>Giraffe Partners</span>
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
