import { SectionHero } from '@/sections/01-hero/SectionHero';
import { SectionTeam } from '@/sections/02-team/SectionTeam';
import { SectionWeek } from '@/sections/03-week/SectionWeek';
import { SectionWork } from '@/sections/04-work/SectionWork';
import { SectionRoles } from '@/sections/05-roles/SectionRoles';
import { SectionGallery } from '@/sections/06-gallery/SectionGallery';
import { SectionApply } from '@/sections/07-apply/SectionApply';
import { SectionFaq } from '@/sections/08-faq/SectionFaq';
import { SectionFooter } from '@/sections/09-footer/SectionFooter';

export default function HomePage() {
  return (
    <main id="main-content" className="pt-16">
      <SectionHero />
      <SectionTeam />
      <SectionWeek />
      <SectionWork />
      <SectionRoles />
      <SectionGallery />
      <SectionApply />
      <SectionFaq />
      <SectionFooter />
    </main>
  );
}
