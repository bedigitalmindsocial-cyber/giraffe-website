export function SectionFooter() {
  return (
    <footer
      className="bg-deep-purple text-paper"
      aria-label="Footer"
    >
      <div className="container-content py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Logo */}
          <a
            href="#main-content"
            aria-label="Giraffe Partners"
            className="block"
          >
            <img
              src="/footerlogo.png"
              alt="Giraffe Partners"
              className="h-16 md:h-18 hover:opacity-80 transition-opacity"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>

          {/* Connect here + social icons */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-mid-purple-2">
              Say hi
            </span>
            <div className="flex items-center gap-3">
              <SocialLink
                label="Email Giraffe Partners"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=lovish@giraffe.partners"
              >
                <MailIcon />
              </SocialLink>
              <SocialLink
                label="Life with Giraffe on Instagram"
                href="https://www.instagram.com/lifewithgiraffe/"
              >
                <InstagramIcon />
              </SocialLink>
              <SocialLink
                label="Giraffe Partners on LinkedIn"
                href="https://linkedin.com/company/giraffe-partners/"
              >
                <LinkedInIcon />
              </SocialLink>
            </div>
          </div>

          {/* Copyright */}
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-mid-purple-2">
            Giraffe Partners © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-mid-purple-1/40 text-mid-purple-2 hover:text-paper hover:border-paper hover:bg-paper/5 transition-colors"
    >
      {children}
    </a>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67h-3.55V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
