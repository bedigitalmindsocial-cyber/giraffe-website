import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { fetchOpenRoles } from '@/lib/wp-api';
import { Corkboard } from './Corkboard';

export async function SectionRoles() {
  const openRoles = await fetchOpenRoles();

  return (
    <section id="roles" aria-label="Open roles" className="bg-paper text-ink">
      <div className="container-content section-padding">
        <SectionHeading
          eyebrow="Hiring, when we have a real seat."
          heading="The roles open right now."
          body="We do not run rolling job listings. Each role posted here is one we are actively interviewing for. If a role catches your eye, the application form is below."
        />
        <Reveal delay={1}>
          <Corkboard roles={openRoles} />
        </Reveal>
      </div>
    </section>
  );
}
