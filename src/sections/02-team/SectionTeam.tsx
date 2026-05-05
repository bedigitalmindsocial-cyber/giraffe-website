'use client';

import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { getTeamMembers, TeamMember } from '@/lib/wp-api/team';
import { TeamCard } from './TeamCard';

export function SectionTeam() {
  const ITEMS_PER_PAGE = 4;
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const members = await getTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error('Error loading team members:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  const displayedMembers = teamMembers.slice(0, visibleCount);
  const hasMore = visibleCount < teamMembers.length;
  const canShowLess = visibleCount > ITEMS_PER_PAGE;

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleSeeLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section id="team" aria-label="The team" className="bg-paper text-ink">
      <div className="section-padding px-0">
        <div className="container-content px-4 md:px-6 mb-8 md:mb-12">
          <SectionHeading
            eyebrow="Meet our team"
            heading="The creative minds"
          />
        </div>

        {loading && (
          <div className="container-content px-4 md:px-6">
            <p className="text-center">Loading team members...</p>
          </div>
        )}

        {!loading && teamMembers.length === 0 && (
          <div className="container-content px-4 md:px-6">
            <p className="text-center">No team members found.</p>
          </div>
        )}

        {!loading && teamMembers.length > 0 && (
          <>
            <div 
              className="relative w-full"
              style={{ borderTop: "1px solid #000" }}
            >
              {displayedMembers.map((member, i) => (
                <div
                  key={member.id}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <TeamCard
                    member={member}
                    isHovered={hoveredIndex === i}
                    isFirst={false}
                  />
                </div>
              ))}
            </div>

            {(hasMore || canShowLess) && (
              <div className="container-content px-4 md:px-6 mt-8 md:mt-12 flex justify-center gap-4">
                {hasMore && (
                  <button
                    onClick={handleSeeMore}
                    className="px-6 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
                  >
                    See More
                  </button>
                )}
                {canShowLess && (
                  <button
                    onClick={handleSeeLess}
                    className="px-6 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
                  >
                    See Less
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}