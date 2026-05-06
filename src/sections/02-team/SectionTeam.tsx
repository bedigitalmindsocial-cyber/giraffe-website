'use client';

import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/SectionHeading';
import { getTeamMembers } from '@/lib/wp-api/team';
import type { TeamMember } from '@/lib/types';
import { TeamCard } from './TeamCard';

export function SectionTeam() {
  const ITEMS_PER_PAGE = 4;
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        console.log('[SectionTeam] Loading team members...');
        const members = await getTeamMembers();
        console.log('[SectionTeam] Loaded members:', members);
        setTeamMembers(members);
        setError(null);
      } catch (err) {
        console.error('[SectionTeam] Error loading team members:', err);
        setError(err instanceof Error ? err.message : 'Failed to load team members');
        setTeamMembers([]);
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
            <p className="text-center text-mid-purple-1">Loading team members...</p>
          </div>
        )}

        {error && (
          <div className="container-content px-4 md:px-6">
            <p className="text-center text-red-600">
              Error: {error}
            </p>
            <p className="text-center text-sm text-mid-purple-1 mt-2">
              Check browser console (F12) for more details
            </p>
          </div>
        )}

        {!loading && !error && teamMembers.length === 0 && (
          <div className="container-content px-4 md:px-6">
            <p className="text-center text-mid-purple-1">No team members found.</p>
            <p className="text-center text-sm text-mid-purple-1 mt-2">
              Make sure team members are published in WordPress and the API endpoint is accessible.
            </p>
          </div>
        )}

        {!loading && !error && teamMembers.length > 0 && (
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
